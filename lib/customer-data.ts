import { customerAccountFetch, type CustomerSession } from "@/lib/customer-account";

export type CustomerMoney = { amount: string; currencyCode: string };
export type CustomerAddress = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  territoryCode?: string | null;
  zoneCode?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
  formatted: string[];
};
export type CustomerOrderLine = {
  id: string;
  title: string;
  variantTitle?: string | null;
  variantId?: string | null;
  quantity: number;
  image?: { url: string; altText?: string | null } | null;
  totalPrice?: CustomerMoney | null;
};
export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string | null;
  fulfillmentStatus: string;
  totalPrice: CustomerMoney;
  subtotal?: CustomerMoney | null;
  totalShipping: CustomerMoney;
  totalTax?: CustomerMoney | null;
  shippingAddress?: CustomerAddress | null;
  lineItems: { nodes: CustomerOrderLine[] };
  fulfillments: { nodes: { id: string; status?: string | null; latestShipmentStatus?: string | null; estimatedDeliveryAt?: string | null; trackingInformation: { company?: string | null; number?: string | null; url?: string | null }[] }[] };
};
export type CustomerAccount = {
  id: string;
  displayName: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: { emailAddress: string } | null;
  defaultAddress?: CustomerAddress | null;
  addresses: { nodes: CustomerAddress[] };
  orders: { nodes: CustomerOrder[]; pageInfo: { hasNextPage: boolean; endCursor?: string | null } };
};

const ADDRESS_FIELDS = `
  id firstName lastName address1 address2 city zip territoryCode zoneCode country phoneNumber formatted
`;

const ORDER_FIELDS = `
  id name processedAt financialStatus fulfillmentStatus
  totalPrice { amount currencyCode }
  subtotal { amount currencyCode }
  totalShipping { amount currencyCode }
  totalTax { amount currencyCode }
  shippingAddress { ${ADDRESS_FIELDS} }
  lineItems(first: 100) { nodes { id title variantTitle variantId quantity image { url altText } totalPrice { amount currencyCode } } }
  fulfillments(first: 20) { nodes { id status latestShipmentStatus estimatedDeliveryAt trackingInformation { company number url } } }
`;

const CUSTOMER_QUERY = `query CustomerAccount($first: Int!, $after: String) {
  customer {
    id displayName firstName lastName emailAddress { emailAddress }
    defaultAddress { ${ADDRESS_FIELDS} }
    addresses(first: 50) { nodes { ${ADDRESS_FIELDS} } }
    orders(first: $first, after: $after, sortKey: PROCESSED_AT, reverse: true) {
      nodes { ${ORDER_FIELDS} }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

export async function getCustomerAccount(session: CustomerSession, first = 20, after?: string | null) {
  const data = await customerAccountFetch<{ customer: CustomerAccount }>(session, CUSTOMER_QUERY, { first, after: after || null });
  return data.customer;
}

export async function getCustomerOrder(session: CustomerSession, id: string) {
  if (!id.startsWith("gid://shopify/Order/")) return undefined;
  const data = await customerAccountFetch<{ order: CustomerOrder | null }>(session, `query CustomerOrder($id: ID!) { order(id: $id) { ${ORDER_FIELDS} } }`, { id });
  return data.order;
}

export type CustomerProfileInput = { firstName?: string; lastName?: string };
export type CustomerAddressInput = {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  territoryCode?: string;
  zoneCode?: string;
  company?: string;
  phoneNumber?: string;
};

function cleanText(value: unknown, maximum = 120) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : undefined;
}

export function sanitizeProfileInput(value: unknown): CustomerProfileInput {
  const input = value as Record<string, unknown>;
  const firstName = cleanText(input.firstName);
  const lastName = cleanText(input.lastName);
  if (!firstName && !lastName) throw new Error("Enter a first name or last name.");
  return { ...(firstName ? { firstName } : {}), ...(lastName ? { lastName } : {}) };
}

export function sanitizeAddressInput(value: unknown): CustomerAddressInput {
  const input = value as Record<string, unknown>;
  const address1 = cleanText(input.address1);
  const city = cleanText(input.city);
  const territoryCode = cleanText(input.territoryCode, 3)?.toUpperCase();
  if (!address1 || !city || !territoryCode) throw new Error("Address line 1, town/city and country are required.");
  const phoneNumber = cleanText(input.phoneNumber, 30);
  if (phoneNumber && !/^\+[1-9]\d{6,14}$/.test(phoneNumber)) throw new Error("Enter the phone number in international format, for example +441234567890.");
  return {
    address1, city, territoryCode,
    address2: cleanText(input.address2), company: cleanText(input.company), firstName: cleanText(input.firstName), lastName: cleanText(input.lastName), zip: cleanText(input.zip, 20), zoneCode: cleanText(input.zoneCode, 10), phoneNumber,
  };
}

function userError(payload: { userErrors: { message: string }[] }) {
  const message = payload.userErrors[0]?.message;
  if (message) throw new Error(message);
}

export async function updateCustomerProfile(session: CustomerSession, input: CustomerProfileInput) {
  const data = await customerAccountFetch<{ customerUpdate: { customer?: Pick<CustomerAccount, "firstName" | "lastName">; userErrors: { message: string }[] } }>(session, `mutation CustomerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) { customer { firstName lastName } userErrors { message } }
  }`, { input });
  userError(data.customerUpdate);
  return data.customerUpdate.customer;
}

export async function createCustomerAddress(session: CustomerSession, address: CustomerAddressInput, defaultAddress: boolean) {
  const data = await customerAccountFetch<{ customerAddressCreate: { customerAddress?: CustomerAddress; userErrors: { message: string }[] } }>(session, `mutation AddressCreate($address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressCreate(address: $address, defaultAddress: $defaultAddress) { customerAddress { ${ADDRESS_FIELDS} } userErrors { message } }
  }`, { address, defaultAddress });
  userError(data.customerAddressCreate);
  return data.customerAddressCreate.customerAddress;
}

export async function updateCustomerAddress(session: CustomerSession, addressId: string, address: CustomerAddressInput, defaultAddress?: boolean) {
  if (!addressId.startsWith("gid://shopify/CustomerAddress/")) throw new Error("Invalid address.");
  const data = await customerAccountFetch<{ customerAddressUpdate: { customerAddress?: CustomerAddress; userErrors: { message: string }[] } }>(session, `mutation AddressUpdate($addressId: ID!, $address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressUpdate(addressId: $addressId, address: $address, defaultAddress: $defaultAddress) { customerAddress { ${ADDRESS_FIELDS} } userErrors { message } }
  }`, { addressId, address, defaultAddress: defaultAddress ?? null });
  userError(data.customerAddressUpdate);
  return data.customerAddressUpdate.customerAddress;
}

export async function deleteCustomerAddress(session: CustomerSession, addressId: string) {
  if (!addressId.startsWith("gid://shopify/CustomerAddress/")) throw new Error("Invalid address.");
  const data = await customerAccountFetch<{ customerAddressDelete: { deletedAddressId?: string; userErrors: { message: string }[] } }>(session, `mutation AddressDelete($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) { deletedAddressId userErrors { message } }
  }`, { addressId });
  userError(data.customerAddressDelete);
  return data.customerAddressDelete.deletedAddressId;
}
