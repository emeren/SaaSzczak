import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto w-[min(1080px,calc(100%-2rem))] px-4 pt-14 pb-8">
      <section className="animate-rise-in border-border bg-card relative overflow-hidden rounded-[2rem] border px-6 py-10 shadow-sm sm:px-10 sm:py-14">
        <p className="text-primary mb-3 text-xs font-bold tracking-widest uppercase">
          TanStack Start Base Template
        </p>
        <h1 className="text-foreground mb-5 max-w-3xl font-serif text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
          Start simple, ship quickly.
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-base sm:text-lg">
          This base starter intentionally keeps things light: two routes, clean
          structure, and the essentials you need to build from scratch.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/about"
            className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 rounded-full border px-5 py-2.5 text-sm font-semibold no-underline transition hover:-translate-y-0.5"
          >
            About This Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground/20 bg-card text-foreground hover:border-foreground/35 rounded-full border px-5 py-2.5 text-sm font-semibold no-underline transition hover:-translate-y-0.5"
          >
            Router Guide
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            'Type-Safe Routing',
            'Routes and links stay in sync across every page.',
          ],
          [
            'Server Functions',
            'Call server code from your UI without creating API boilerplate.',
          ],
          [
            'Streaming by Default',
            'Ship progressively rendered responses for faster experiences.',
          ],
          [
            'Tailwind Native',
            'Design quickly with utility-first styling and reusable tokens.',
          ],
        ].map(([title, desc], index) => (
          <article
            key={title}
            className="animate-rise-in border-border bg-card hover:border-primary/35 rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="text-foreground mb-2 text-base font-semibold">
              {title}
            </h2>
            <p className="text-muted-foreground m-0 text-sm">{desc}</p>
          </article>
        ))}
      </section>

      <section className="border-border bg-card mt-8 rounded-2xl border p-6 shadow-sm">
        <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
          Quick Start
        </p>
        <ul className="text-muted-foreground m-0 list-disc space-y-2 pl-5 text-sm">
          <li>
            Edit{' '}
            <code className="border-border bg-muted rounded border px-1.5 py-0.5 text-[0.9em]">
              src/routes/index.tsx
            </code>{' '}
            to customize the home page.
          </li>
          <li>
            Update{' '}
            <code className="border-border bg-muted rounded border px-1.5 py-0.5 text-[0.9em]">
              src/components/Header/Header.tsx
            </code>{' '}
            and{' '}
            <code className="border-border bg-muted rounded border px-1.5 py-0.5 text-[0.9em]">
              src/components/Footer/Footer.tsx
            </code>{' '}
            for brand links.
          </li>
          <li>
            Add routes in{' '}
            <code className="border-border bg-muted rounded border px-1.5 py-0.5 text-[0.9em]">
              src/routes
            </code>{' '}
            and tweak visual tokens in{' '}
            <code className="border-border bg-muted rounded border px-1.5 py-0.5 text-[0.9em]">
              src/styles.css
            </code>
            .
          </li>
        </ul>
      </section>
    </main>
  )
}
