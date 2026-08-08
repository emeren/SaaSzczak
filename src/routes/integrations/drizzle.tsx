import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db/index'
import { desc } from 'drizzle-orm'
import { todos } from '#/db/schema'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'

const getTodos = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db.query.todos.findMany({
    orderBy: [desc(todos.createdAt)],
  })
})

const createTodo = createServerFn({
  method: 'POST',
})
  .validator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    await db.insert(todos).values({ title: data.title })
    return { success: true }
  })

export const Route = createFileRoute('/integrations/drizzle')({
  component: DemoDrizzle,
  loader: async () => await getTodos(),
})

function DemoDrizzle() {
  const router = useRouter()
  const todoList = Route.useLoaderData()

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get('title') as string

    if (!title) return

    try {
      await createTodo({ data: { title } })
      router.invalidate()
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-[min(1080px,calc(100%-2rem))] items-center justify-center px-4 py-14">
      <Card className="w-full max-w-2xl rounded-2xl">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-3">
            <img src="/drizzle.svg" alt="Drizzle Logo" className="h-8 w-8" />
          </span>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Database
            </p>
            <CardTitle className="font-serif text-2xl">Drizzle Demo</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <h2 className="mb-4 font-serif text-lg font-semibold">Todos</h2>

          <ul className="mb-6 space-y-3">
            {todoList.map((todo) => (
              <li
                key={todo.id}
                className="rounded-lg border border-border bg-muted/40 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{todo.title}</span>
                  <span className="text-xs text-muted-foreground">
                    #{todo.id}
                  </span>
                </div>
              </li>
            ))}
            {todoList.length === 0 && (
              <li className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-center text-muted-foreground">
                No todos yet. Create one below!
              </li>
            )}
          </ul>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Input
              type="text"
              name="title"
              placeholder="Add a new todo..."
              className="min-w-0 flex-1"
            />
            <Button type="submit" className="whitespace-nowrap">
              Add Todo
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="mb-2 font-serif text-base font-semibold">
              Powered by Drizzle ORM
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Next-generation ORM for Node.js & TypeScript with PostgreSQL
            </p>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Setup Instructions:</p>
              <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
                <li>
                  Configure your{' '}
                  <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                    DATABASE_URL
                  </code>{' '}
                  in .env.local
                </li>
                <li>
                  Run:{' '}
                  <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                    pnpm dlx drizzle-kit generate
                  </code>
                </li>
                <li>
                  Run:{' '}
                  <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                    pnpm dlx drizzle-kit migrate
                  </code>
                </li>
                <li>
                  Optional:{' '}
                  <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                    pnpm dlx drizzle-kit studio
                  </code>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
