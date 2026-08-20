import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";

const ACCESS_COOKIE = "aglory_ca_access";
const REFRESH_COOKIE = "aglory_ca_refresh";
const ID_COOKIE = "aglory_ca_id";
const EXPIRES_COOKIE = "aglory_ca_expires";
const STATE_COOKIE = "aglory_ca_state";
const VERIFIER_COOKIE = "aglory_ca_verifier";
const NONCE_COOKIE = "aglory_ca_nonce";
const RETURN_TO_COOKIE = "aglory_ca_return_to";

type CookieWriter = {
  set: (name: string, value: string, options?: Record<string, unknown>) => unknown;
  delete: (name: string) => unknown;
};

type OpenIdConfiguration = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  jwks_uri: string;
  issuer: string;
};

type CustomerApiConfiguration = { graphql_api: string };

export type CustomerSession = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number;
};

type OAuthTokens = {
  access_token: string;
  refresh_token: string;
  id_token?: string;
  expires_in: number;
};

function shopDomain() {
  return (process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

function clientId() {
  return process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || "";
}

function callbackUrl() {
  return process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI || "";
}

function assertConfiguration() {
  if (!shopDomain() || !clientId() || !callbackUrl()) {
    throw new Error("Customer accounts are not configured.");
  }
}

function base64Url(value: Buffer) {
  return value.toString("base64url");
}

function equal(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function cookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    ...(maxAge ? { maxAge } : {}),
  };
}

export function safeReturnTo(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/account";
  return value;
}

export async function getOpenIdConfiguration(): Promise<OpenIdConfiguration> {
  assertConfiguration();
  const response = await fetch(`https://${shopDomain()}/.well-known/openid-configuration`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Customer account service is unavailable.");
  return response.json() as Promise<OpenIdConfiguration>;
}

export async function getCustomerApiConfiguration(): Promise<CustomerApiConfiguration> {
  assertConfiguration();
  const response = await fetch(`https://${shopDomain()}/.well-known/customer-account-api`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Customer account service is unavailable.");
  return response.json() as Promise<CustomerApiConfiguration>;
}

export async function createAuthorizationRequest(returnTo: string) {
  const config = await getOpenIdConfiguration();
  const state = base64Url(randomBytes(32));
  const nonce = base64Url(randomBytes(32));
  const verifier = base64Url(randomBytes(64));
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const authorizationUrl = new URL(config.authorization_endpoint);
  authorizationUrl.searchParams.set("scope", "openid email customer-account-api:full");
  authorizationUrl.searchParams.set("client_id", clientId());
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("redirect_uri", callbackUrl());
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("nonce", nonce);
  authorizationUrl.searchParams.set("code_challenge", challenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  return { authorizationUrl: authorizationUrl.toString(), state, nonce, verifier, returnTo: safeReturnTo(returnTo) };
}

export function savePendingAuthorization(writer: CookieWriter, pending: Awaited<ReturnType<typeof createAuthorizationRequest>>) {
  const options = cookieOptions(10 * 60);
  writer.set(STATE_COOKIE, pending.state, options);
  writer.set(VERIFIER_COOKIE, pending.verifier, options);
  writer.set(NONCE_COOKIE, pending.nonce, options);
  writer.set(RETURN_TO_COOKIE, pending.returnTo, options);
}

export function clearPendingAuthorization(writer: CookieWriter) {
  writer.delete(STATE_COOKIE);
  writer.delete(VERIFIER_COOKIE);
  writer.delete(NONCE_COOKIE);
  writer.delete(RETURN_TO_COOKIE);
}

async function exchangeToken(body: URLSearchParams) {
  const config = await getOpenIdConfiguration();
  const response = await fetch(config.token_endpoint, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error("Customer sign-in could not be completed.");
  return response.json() as Promise<OAuthTokens>;
}

export async function exchangeAuthorizationCode(code: string, receivedState: string) {
  const store = await cookies();
  const state = store.get(STATE_COOKIE)?.value;
  const verifier = store.get(VERIFIER_COOKIE)?.value;
  const nonce = store.get(NONCE_COOKIE)?.value;
  const returnTo = safeReturnTo(store.get(RETURN_TO_COOKIE)?.value);
  if (!state || !verifier || !nonce || !equal(state, receivedState)) throw new Error("Your sign-in link has expired. Please try again.");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId(),
    redirect_uri: callbackUrl(),
    code,
    code_verifier: verifier,
  });
  const tokens = await exchangeToken(body);
  if (!tokens.id_token || !tokens.access_token || !tokens.refresh_token) throw new Error("Customer sign-in could not be completed.");

  const config = await getOpenIdConfiguration();
  const jwks = createRemoteJWKSet(new URL(config.jwks_uri));
  const { payload } = await jwtVerify(tokens.id_token, jwks, { issuer: config.issuer, audience: clientId() });
  if (payload.nonce !== nonce) throw new Error("Customer sign-in could not be completed.");
  return {
    returnTo,
    session: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      expiresAt: Date.now() + Math.max(tokens.expires_in, 60) * 1000,
    },
  };
}

export function saveCustomerSession(writer: CookieWriter, session: CustomerSession) {
  const accessSeconds = Math.max(60, Math.floor((session.expiresAt - Date.now()) / 1000));
  writer.set(ACCESS_COOKIE, session.accessToken, cookieOptions(accessSeconds));
  writer.set(REFRESH_COOKIE, session.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  writer.set(ID_COOKIE, session.idToken, cookieOptions(60 * 60 * 24 * 30));
  writer.set(EXPIRES_COOKIE, String(session.expiresAt), cookieOptions(60 * 60 * 24 * 30));
}

export function clearCustomerSession(writer: CookieWriter) {
  [ACCESS_COOKIE, REFRESH_COOKIE, ID_COOKIE, EXPIRES_COOKIE].forEach((name) => writer.delete(name));
}

export async function getCustomerSession() {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  const idToken = store.get(ID_COOKIE)?.value;
  const expiresAt = Number(store.get(EXPIRES_COOKIE)?.value || 0);
  if (!accessToken || !refreshToken || !idToken) return undefined;
  return { accessToken, refreshToken, idToken, expiresAt };
}

export function sessionNeedsRefresh(session: CustomerSession) {
  return session.expiresAt <= Date.now() + 60_000;
}

export async function refreshCustomerSession(session: CustomerSession): Promise<CustomerSession | undefined> {
  try {
    const body = new URLSearchParams({ grant_type: "refresh_token", client_id: clientId(), refresh_token: session.refreshToken });
    const tokens = await exchangeToken(body);
    if (!tokens.access_token || !tokens.refresh_token) return undefined;
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token || session.idToken,
      expiresAt: Date.now() + Math.max(tokens.expires_in, 60) * 1000,
    };
  } catch {
    return undefined;
  }
}

export async function customerAccountFetch<T>(session: CustomerSession, query: string, variables?: Record<string, unknown>) {
  const { graphql_api } = await getCustomerApiConfiguration();
  const response = await fetch(graphql_api, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json", Authorization: session.accessToken },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json() as { data?: T; errors?: { message: string }[] };
  if (!response.ok || result.errors?.length || !result.data) throw new Error("Your account information is temporarily unavailable.");
  return result.data;
}

export async function createLogoutUrl() {
  const store = await cookies();
  const idToken = store.get(ID_COOKIE)?.value;
  if (!idToken) return safeReturnTo(process.env.SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_REDIRECT_URI || "/");
  const config = await getOpenIdConfiguration();
  const logout = new URL(config.end_session_endpoint);
  logout.searchParams.set("id_token_hint", idToken);
  logout.searchParams.set("post_logout_redirect_uri", process.env.SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_REDIRECT_URI || callbackUrl().replace(/\/auth\/callback$/, "/"));
  return logout.toString();
}
