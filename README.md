This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Shopify headless setup

The storefront reads its catalogue and creates carts through Shopify's Storefront API. Set these server-only variables in local `.env.local` and in the deployment environment:

```bash
SHOPIFY_STORE_DOMAIN=aglory-hair-and-cosmetics.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_WEBHOOK_SECRET=your_shopify_webhook_secret
```

The Storefront token is deliberately kept behind the site API routes; do not expose it through `NEXT_PUBLIC_*` variables. In Shopify, grant it unauthenticated product and cart/checkout access. Inventory quantities are not requested; Shopify enforces stock availability during cart changes and checkout.

This site now requires a Next.js-capable runtime (for dynamic catalogue pages, secure cart requests, and webhook cache invalidation). It is no longer a static export; configure the three variables above in every production environment before deploying.

## Shopify Customer Accounts

The account area uses Shopify Customer Accounts and the Customer Account API, not a local password system. It uses the provided Customer Account API public web-client ID with server-side OAuth state/PKCE handling and `HttpOnly` session cookies.

In Shopify Admin, enable Customer Accounts and then, in **Headless → Customer Account API**, configure a public web client with these exact production URLs:

```text
Callback: https://www.agloryhairandcosmetics.co.uk/auth/callback
Logout:   https://www.agloryhairandcosmetics.co.uk/
```

Add the client ID and the same URLs as `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`, `SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI`, and `SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_REDIRECT_URI` in the hosting environment. Enable protected customer-data access and the customer read/write permissions required for orders, addresses, and profile updates. Guest cart and checkout stay available without authentication.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
