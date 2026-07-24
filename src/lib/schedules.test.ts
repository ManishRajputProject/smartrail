import { describe, it, expect } from "vitest";
import {
  getSchedule,
  hasSchedule,
  haltMinutes,
  journeyMinutes,
  formatDurationMins,
  scheduledTrainCount,
} from "./schedules";

describe("haltMinutes", () => {
  it("returns dwell time in minutes", () => {
    expect(haltMinutes("19:37", "19:40")).toBe(3);
    expect(haltMinutes("21:06", "21:22")).toBe(16);
  });

  it("handles a halt spanning midnight", () => {
    expect(haltMinutes("23:58", "00:03")).toBe(5);
  });

  it("returns null at terminals where one side is missing", () => {
    expect(haltMinutes(null, "16:40")).toBeNull();
    expect(haltMinutes("08:30", null)).toBeNull();
  });
});

describe("getSchedule", () => {
  it("returns only real commercial halts, not passing points", () => {
    // 12951 passes 202 points in the source but stops at 6.
    const stops = getSchedule("12951");
    expect(stops.length).toBe(6);
    expect(stops.map((s) => s.code)).toEqual(["BCT", "ST", "BRC", "RTM", "KOTA", "NDLS"]);
  });

  it("marks the origin with no arrival and the terminus with no departure", () => {
    const stops = getSchedule("12951");
    expect(stops[0].arrival).toBeNull();
    expect(stops[0].departure).toBe("16:40");
    expect(stops[stops.length - 1].departure).toBeNull();
    expect(stops[stops.length - 1].arrival).toBe("08:30");
  });

  it("carries a day counter that increments on an overnight run", () => {
    const stops = getSchedule("12951");
    expect(stops[0].day).toBe(1);
    expect(stops[stops.length - 1].day).toBe(2);
  });

  it("returns an empty array for an unknown train rather than throwing", () => {
    expect(getSchedule("00000")).toEqual([]);
    expect(hasSchedule("00000")).toBe(false);
  });
});

describe("journeyMinutes", () => {
  it("spans midnight correctly using the day counter", () => {
    // 12951: 16:40 day 1 -> 08:30 day 2 = 15h 50m
    expect(journeyMinutes(getSchedule("12951"))).toBe(950);
    expect(formatDurationMins(950)).toBe("15h 50m");
  });

  it("returns null when there are too few stops", () => {
    expect(journeyMinutes([])).toBeNull();
  });
});

describe("dataset coverage", () => {
  it("covers the published train catalogue", () => {
    expect(scheduledTrainCount()).toBeGreaterThan(5000);
  });
});
