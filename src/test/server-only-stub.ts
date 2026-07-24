/**
 * Test-only stub for the `server-only` package, wired up in vitest.config.ts.
 *
 * The real package throws when imported outside a Server Component, which
 * would make server-only modules (rail-data, schedules) impossible to unit
 * test. The production build still uses the real guard.
 */
export {};
