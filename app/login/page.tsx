import { AuthPage } from "@/components/auth-ui";

export const metadata = { title: "Sign in | Aglory Hair and Cosmetics" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; returnTo?: string }> }) {
  const { error, returnTo } = await searchParams;
  return <AuthPage mode="login" error={error} returnTo={returnTo} />;
}
