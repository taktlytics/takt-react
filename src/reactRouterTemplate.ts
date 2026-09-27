export interface ReactRouterLike {
  state: { matches: ReadonlyArray<{ route: { path?: string } }> }
}

export function reactRouterTemplate(router: ReactRouterLike): string | null {
  const { matches } = router.state
  if (matches.length === 0) return null
  let segments: string[] = []
  for (const { route } of matches) {
    if (route.path === undefined) continue
    if (route.path.startsWith('/')) segments = []
    segments.push(...route.path.split('/').filter(Boolean))
  }
  return `/${segments.join('/')}`
}
