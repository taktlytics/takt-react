import { describe, it, expect } from 'vitest'
import { reactRouterTemplate } from '../src/reactRouterTemplate'

const routerWith = (...paths: Array<string | undefined>) => ({
  state: { matches: paths.map((path) => ({ route: path === undefined ? {} : { path } })) },
})

describe('reactRouterTemplate', () => {
  it('returns null when nothing matches', () => {
    expect(reactRouterTemplate(routerWith())).toBeNull()
  })

  it('returns the root template', () => {
    expect(reactRouterTemplate(routerWith('/'))).toBe('/')
  })

  it('joins relative child paths under their parent', () => {
    expect(reactRouterTemplate(routerWith('/', 'users', ':id'))).toBe('/users/:id')
  })

  it('skips pathless layout and index routes', () => {
    expect(reactRouterTemplate(routerWith('/', undefined, 'blog', undefined, ':slug', undefined))).toBe('/blog/:slug')
  })

  it('restarts from an absolute child path', () => {
    expect(reactRouterTemplate(routerWith('/', 'app', '/settings/:tab'))).toBe('/settings/:tab')
  })

  it('keeps a splat segment', () => {
    expect(reactRouterTemplate(routerWith('/', 'docs', '*'))).toBe('/docs/*')
  })

  it('keeps a top-level splat', () => {
    expect(reactRouterTemplate(routerWith('*'))).toBe('/*')
  })

  it('normalizes slashes inside and around segments', () => {
    expect(reactRouterTemplate(routerWith('/', 'teams/', '/teams/:team/', 'members/:id/'))).toBe('/teams/:team/members/:id')
  })

  it('returns the root when only pathless routes match', () => {
    expect(reactRouterTemplate(routerWith(undefined, undefined))).toBe('/')
  })

  it('reads the current state on every call', () => {
    const router = routerWith('/', 'a')
    expect(reactRouterTemplate(router)).toBe('/a')
    router.state = routerWith('/', 'b', ':id').state
    expect(reactRouterTemplate(router)).toBe('/b/:id')
  })
})
