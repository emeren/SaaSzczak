export type NavigationProps = Record<string, never>

export type NavigationLink = {
  to: string
  label: string
  external?: boolean
}
