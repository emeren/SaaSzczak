import { createFileRoute, Link } from '@tanstack/react-router'
import { usePostHog } from '@posthog/react'
import { useState } from 'react'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Alert, AlertDescription } from '#/components/ui/alert'

export const Route = createFileRoute('/integrations/posthog')({
  component: PostHogDemo,
})

function PostHogDemo() {
  const posthog = usePostHog()
  const [eventCount, setEventCount] = useState(0)
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY
  const isConfigured = Boolean(posthogKey) && posthogKey !== 'phc_xxx'

  const trackEvent = (
    eventName: string,
    properties?: Record<string, unknown>,
  ) => {
    posthog.capture(eventName, properties)
    setEventCount((c) => c + 1)
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-[min(1080px,calc(100%-2rem))] items-center justify-center px-4 py-14">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Analytics
          </p>
          <CardTitle className="font-serif text-2xl">PostHog Demo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!isConfigured && (
            <Alert>
              <AlertDescription>
                <strong>Warning:</strong> VITE_POSTHOG_KEY is not configured.
                Events won't be sent to PostHog. Add it to your{' '}
                <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em]">
                  .env
                </code>{' '}
                file.
              </AlertDescription>
            </Alert>
          )}

          <Card className="rounded-xl bg-muted/30 shadow-none">
            <CardContent className="space-y-4 px-5 py-5">
              <CardDescription>
                Click the button below to send events to PostHog. Check your
                PostHog dashboard to see them appear in real-time.
              </CardDescription>

              <Button
                onClick={() => trackEvent('button_clicked', { button: 'demo' })}
                className="w-full"
              >
                Track Click
              </Button>

              {isConfigured && (
                <div className="rounded-lg border border-border bg-card px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    Events sent this session:
                  </p>
                  <p className="text-4xl font-bold">{eventCount}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground">
            Open your{' '}
            <a
              href="https://app.posthog.com/events"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              PostHog Events
            </a>{' '}
            page to see these events appear.
          </p>

          <p className="text-sm text-muted-foreground">
            Learn more in the{' '}
            <a
              href="https://posthog.com/docs/libraries/react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              PostHog React docs
            </a>
            .
          </p>

          <div>
            <Link to="/">&larr; Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
