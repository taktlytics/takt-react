---
"@vskstudio/takt-react": minor
---

Requires `@vskstudio/takt-core` >=0.12.1. New `redactUndecodablePaths` prop on `<Takt>` and `redact-undecodable-paths` attribute on `<takt-analytics>` (`false` or `0` decodes undecodable paths leniently instead of masking them). New `track-404` presence attribute and `file-extensions` attribute on `<takt-analytics>`, matching the `track404` prop and the `files` extensions. `normalizeHost`, `TrackOptions` and `RouteTemplateResolver` are re-exported from core.
