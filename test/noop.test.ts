import { describe, it, expect, vi, beforeEach } from 'vitest'

beforeEach(() => {
  vi.resetModules()
})

describe('noopTakt', () => {
  it('never throws and returns a stable instance', async () => {
    const { noopTakt } = await import('../src/noop')
    const a = noopTakt()
    expect(() => a.track('X')).not.toThrow()
    expect(() => a.pageview()).not.toThrow()
    expect(noopTakt()).toBe(a)
  })

  it('warns once', async () => {
    const { noopTakt } = await import('../src/noop')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    noopTakt().track('A')
    noopTakt().track('B')
    expect(warn).toHaveBeenCalledTimes(1)
    warn.mockRestore()
  })

  it('delegates consent to core so it works before <Takt> mounts', async () => {
    const optOut = vi.fn()
    const optIn = vi.fn()
    const isOptedOut = vi.fn(() => true)
    vi.doMock('@vskstudio/takt-core', () => ({ optOut, optIn, isOptedOut }))
    const { noopTakt } = await import('../src/noop')
    const takt = noopTakt()
    takt.optOut()
    takt.optIn()
    expect(takt.isOptedOut()).toBe(true)
    expect(optOut).toHaveBeenCalledOnce()
    expect(optIn).toHaveBeenCalledOnce()
    vi.doUnmock('@vskstudio/takt-core')
  })
})
