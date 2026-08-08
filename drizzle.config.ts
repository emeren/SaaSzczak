import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Better Auth manages its own tables (user, session, account, verification)
  // via `@better-auth/cli migrate` — exclude them so drizzle-kit push never
  // proposes dropping/renaming them.
  tablesFilter: ['todos', 'subscriptions'],
})
