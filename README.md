# SaaSzczak

Reusable base for the app portfolio: TanStack Start + Supabase (Postgres) +
Better Auth + Stripe + Resend + PostHog + Sentry + shadcn/ui. Clone this repo
per idea instead of starting from zero each time — see
[Using this as a template](#using-this-as-a-template-for-a-new-app) at the
bottom.

# Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

## Full setup checklist (new machine / new clone)

1. **Supabase** (database): create a project at [supabase.com](https://supabase.com/dashboard) →
   Settings > Database > Connection string > copy the **Transaction pooler**
   URI → set as `DATABASE_URL` in `.env.local`.
2. **Better Auth**: `pnpm dlx @better-auth/cli secret` → set `BETTER_AUTH_SECRET`.
   Then push its tables: `pnpm dlx @better-auth/cli migrate`.
3. **App schema**: `pnpm db:push` to create the `todos`/`subscriptions` tables
   from `src/db/schema.ts` (or `pnpm db:generate` + `pnpm db:migrate` once you
   want versioned migrations instead of push).
4. **Stripe**: create a product/price in the
   [Stripe dashboard](https://dashboard.stripe.com/test/products), set
   `STRIPE_SECRET_KEY` and `VITE_STRIPE_PRICE_ID`. For local webhook testing:
   `stripe listen --forward-to localhost:3000/api/stripe-webhook` and copy the
   printed `whsec_...` into `STRIPE_WEBHOOK_SECRET`.
5. **Resend**: get an API key at [resend.com/api-keys](https://resend.com/api-keys),
   set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (must be a verified domain in
   production).
6. **PostHog / Sentry**: optional, see their sections below.

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```

## Setting up Better Auth

1. Generate and set the `BETTER_AUTH_SECRET` environment variable in your `.env.local`:

   ```bash
   pnpm dlx @better-auth/cli secret
   ```

2. Visit the [Better Auth documentation](https://www.better-auth.com) to unlock the full potential of authentication in your app.

### Database

Already wired to Postgres via a `pg.Pool` in `src/lib/auth.ts`, reading
`DATABASE_URL`. Point it at your Supabase project (see setup checklist above),
then run:

```bash
pnpm dlx @better-auth/cli migrate
```

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpm dlx shadcn@latest add button
```

## Setting up PostHog

1. Create a PostHog account at [posthog.com](https://posthog.com)
2. Get your Project API Key from [Project Settings](https://app.posthog.com/project/settings)
3. Set `VITE_POSTHOG_KEY` in your `.env.local`

### Optional Configuration

- `VITE_POSTHOG_HOST` - Set this if you're using PostHog Cloud EU (`https://eu.i.posthog.com`) or self-hosting

## Setting up Stripe

1. Create a product and price in the
   [Stripe dashboard](https://dashboard.stripe.com/test/products) (test mode
   to start).
2. Set `STRIPE_SECRET_KEY` and `VITE_STRIPE_PRICE_ID` in `.env.local`.
3. Forward webhooks locally with the
   [Stripe CLI](https://docs.stripe.com/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
   Copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Try it at `/demo/stripe` (sign in first at `/demo/better-auth`).

Checkout session creation lives in `src/routes/api/checkout.ts`; webhook
handling (subscription created/updated/deleted → `subscriptions` table) lives
in `src/routes/api/stripe-webhook.ts`. In production, add the webhook endpoint
URL in the Stripe dashboard and use its signing secret instead of the CLI's.

## Setting up Resend

1. Get an API key from [resend.com/api-keys](https://resend.com/api-keys).
2. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local` (in
   production, `RESEND_FROM_EMAIL` must use a domain verified in Resend).
3. Use `sendEmail` from `src/lib/email.ts` anywhere on the server.

## T3Env

- You can use T3Env to add type safety to your environment variables.
- Add Environment variables to the `src/env.mjs` file.
- Use the environment variables in your code.

### Usage

```ts
import { env } from '#/env'

console.log(env.VITE_APP_TITLE)
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router'
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')

  useEffect(() => {
    getServerTime().then(setTime)
  }, [])

  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Deploying to Vercel

1. Push the repo to GitHub, import it in [Vercel](https://vercel.com/new) —
   TanStack Start is auto-detected, no config needed.
2. Add all `.env.local` variables as Vercel Environment Variables
   (Project > Settings > Environment Variables), using **live** Stripe keys
   for production.
3. Set `BETTER_AUTH_URL` to your production URL (e.g.
   `https://yourapp.vercel.app`).
4. Add a production webhook endpoint in the Stripe dashboard pointing at
   `https://yourapp.vercel.app/api/stripe-webhook`, and use its signing
   secret as `STRIPE_WEBHOOK_SECRET`.
5. Run `pnpm dlx @better-auth/cli migrate` and `pnpm db:push` once against the
   production `DATABASE_URL` (locally, with `.env.local` pointed at prod, or
   via `vercel env pull`) to create tables before first use.

# Using this as a template for a new app

This repo is meant to be cloned for every new app idea in the portfolio
rather than rebuilt from scratch:

```bash
git clone ~/Personal/saas-boilerplate ~/Personal/<new-app-name>
cd ~/Personal/<new-app-name>
rm -rf .git && git init
```

Then: create a fresh Supabase project and Stripe product for the new app,
delete the `demo/*` routes you don't need, and rename `subscriptions`/schema
as the new app's domain requires.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
