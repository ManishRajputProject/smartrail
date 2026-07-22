import { describe, it, expect } from "vitest";
import { HOLIDAYS, computeLongWeekends } from "./holidays";

/**
 * The holiday list is hand-maintained. These tests fail loudly *before* the
 * data silently runs out, so the "next long weekend" line on the homepage
 * can't quietly disappear.
 */
describe("holiday data freshness", () => {
  const latest = HOLIDAYS.map((h) => new Date(`${h.date}T00:00:00`)).sort((a, b) => b.getTime() - a.getTime())[0];

  it("still covers at least 6 months into the future", () => {
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    expect(
      latest.getTime(),
      `Holiday data ends ${latest.toISOString().slice(0, 10)}. Add the next year to src/lib/holidays.ts.`
    ).toBeGreaterThan(sixMonths.getTime());
  });

  it("still produces an upcoming long weekend for the homepage", () => {
    expect(computeLongWeekends(new Date()).length).toBeGreaterThan(0);
  });
});
