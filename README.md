This is a [Next.js](https://nextjs.org) project designed to demonstrate how to use precomputed feature flags in a Next.js application.

## Getting Started

First, copy the example env file:

```bash
cp .env.example .env
```

Second, run the development server:

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

You can start editing the page by modifying `src/app/[code]/page.tsx`. The page auto-updates as you edit the file.

## Create Flags

To create a new flag, go to `src/flags.ts` and create a new flag object. Make sure to add it to the `precomputedFlags` array.

## Read Flags

To read a flag inside of the `/[code]/**` route in a `page.tsx` or `layout.tsx` file:

```tsx
import { FlagProps, newFlag, precomputedFlags } from "@/flags";

export default async function Home({
  params,
}: FlagProps): Promise<JSX.Element> {
  const flag: flagType = await newFlag(params.code, precomputedFlags);

  // ...
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next Flags Documentation](https://vercel.com/docs/workflow-collaboration/feature-flags/nextjs-flags-reference) - learn about Next.js feature flags.

## Go Further

- Try out the Vercel Toolbar to override flags as needed
- Create your own flags in the `src/flags.ts` file
- Implement custom logic for your feature flags
- Connect an exteneral flag provider such as LaunchDarkly or Hypertune

## Understanding the Quirks

- Inside the `public` directory there is a `_public` directory. This is a workaround to be able to exempt the route from the flags rewrite in `src/middleware.ts`.
- The `src/middleware.ts` file is a custom middleware that rewrites the URL to include the feature flag code and then masking the rewrite so the user doesn't see the flags. This allows us to precompute the flags and serve static pages with the correct flags.
