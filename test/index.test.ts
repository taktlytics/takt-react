import { describe, it, expect, expectTypeOf } from 'vitest'
import * as api from '../src/index'
import type { Config, Payload, RouteTemplateResolver, TrackOptions } from '../src/index'
import type { TaktProps } from '../src/Takt'
import {
  normalizeHost as coreNormalizeHost,
  type Config as CoreConfig,
  type Payload as CorePayload,
  type RouteTemplateResolver as CoreRouteTemplateResolver,
  type TrackOptions as CoreTrackOptions,
} from '@vskstudio/takt-core'

describe('public API surface', () => {
  it('exports the documented members', () => {
    expect(typeof api.Takt).toBe('function')
    expect(typeof api.useTakt).toBe('function')
    expect(typeof api.useTaktEvent).toBe('function')
    // forwardRef components are exotic objects, not plain functions.
    expect(api.TaktEvent).toBeTypeOf('object')
    expect(api.TaktEvent.displayName).toBe('TaktEvent')
    expect(typeof api.optOut).toBe('function')
    expect(typeof api.optIn).toBe('function')
    expect(typeof api.isOptedOut).toBe('function')
    expect(typeof api.reactRouterTemplate).toBe('function')
    expect(typeof api.normalizeHost).toBe('function')
  })

  it('re-exports the core helper by identity', () => {
    expect(api.normalizeHost).toBe(coreNormalizeHost)
  })

  it('re-exports core types by identity', () => {
    expectTypeOf<RouteTemplateResolver>().toEqualTypeOf<CoreRouteTemplateResolver>()
    expectTypeOf<TrackOptions>().toEqualTypeOf<CoreTrackOptions>()
    expectTypeOf<Payload>().toEqualTypeOf<CorePayload>()
    expectTypeOf<Config>().toEqualTypeOf<CoreConfig>()
    expectTypeOf(api.normalizeHost).toEqualTypeOf(coreNormalizeHost)
  })

  it('types the redactUndecodablePaths option on the component and on core', () => {
    expectTypeOf<TaktProps['redactUndecodablePaths']>().toEqualTypeOf<boolean | undefined>()
    expectTypeOf<Config['redactUndecodablePaths']>().toEqualTypeOf<boolean | undefined>()
  })
})
