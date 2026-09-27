---
'@vskstudio/takt-react': minor
---

New `redactRoutes`, `routeTemplates` and `routeTemplate` props on `<Takt>`, forwarded to core, and a `redact-routes` attribute on `<takt-analytics>`. `routeTemplate` is always read from the latest render. The new `reactRouterTemplate(router)` helper resolves the matched route template of a React Router data router (`createBrowserRouter`) without depending on `react-router`. Requires `@vskstudio/takt-core` 0.10.0.
