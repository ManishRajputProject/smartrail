import { describe, it, expect } from "vitest";
import {
  bookingOpenDate,
  tatkalOpenDateTime,
  estimateWlOutlook,
  estimateFare,
  computeChartTimes,
  nextOccurrence,
  ARP_DAYS,
} from "./irctc-rules";

describe("bookingOpenDate", () => {
  it("subtracts exactly ARP_DAYS from the journey date", () => {
    const journey = new Date(2026, 8, 30); // 30 Sep 2026
    const open = bookingOpenDate(journey);
    const diffDays = Math.round((journey.getTime() - open.getTime()) / 86400000);
    expect(diffDays).toBe(ARP_DAYS);
  });
});

describe("tatkalOpenDateTime", () => {
  it("opens AC classes at 10:00 the day before journey", () => {
    const journey = new Date(2026, 7, 20);
    const open = tatkalOpenDateTime(journey, "3A");
    expect(open.getHours()).toBe(10);
    expect(open.getDate()).toBe(19);
  });

  it("opens non-AC classes at 11:00 the day before journey", () => {
    const journey = new Date(2026, 7, 20);
    const open = tatkalOpenDateTime(journey, "SL");
    expect(open.getHours()).toBe(11);
  });
});

describe("estimateWlOutlook", () => {
  it("rates a low GNWL number with many days remaining as favourable", () => {
    const { band } = estimateWlOutlook({
      wlNumber: 3,
      wlType: "GNWL",
      travelClass: "SL",
      daysToDeparture: 25,
    });
    expect(["Very Likely", "Likely"]).toContain(band);
  });

  it("rates a high TQWL number close to departure as unfavourable", () => {
    const { band } = estimateWlOutlook({
      wlNumber: 55,
      wlType: "TQWL",
      travelClass: "2A",
      daysToDeparture: 1,
    });
    expect(["Unlikely", "Very Unlikely"]).toContain(band);
  });
});

describe("estimateFare", () => {
  it("returns null for an unknown class", () => {
    expect(estimateFare({ travelClass: "XX", distanceKm: 500, isSuperfast: false })).toBeNull();
  });

  it("scales total with passenger count", () => {
    const one = estimateFare({ travelClass: "3A", distanceKm: 500, isSuperfast: true, passengers: 1 });
    const two = estimateFare({ travelClass: "3A", distanceKm: 500, isSuperfast: true, passengers: 2 });
    expect(two!.total).toBe(one!.perPassenger * 2);
  });

  it("applies the senior citizen discount", () => {
    const normal = estimateFare({ travelClass: "SL", distanceKm: 800, isSuperfast: false });
    const senior = estimateFare({ travelClass: "SL", distanceKm: 800, isSuperfast: false, seniorCitizen: true });
    expect(senior!.perPassenger).toBeLessThan(normal!.perPassenger);
  });
});

describe("computeChartTimes", () => {
  it("puts the first chart 4 hours before a normal departure", () => {
    const departure = new Date(2026, 7, 1, 16, 0);
    const { firstChart, earlyMorning } = computeChartTimes(departure);
    expect(earlyMorning).toBe(false);
    expect(firstChart.getHours()).toBe(12);
    expect(firstChart.getDate()).toBe(1);
  });

  it("moves the first chart to 9pm the previous evening for early-morning departures", () => {
    const departure = new Date(2026, 7, 1, 5, 30);
    const { firstChart, earlyMorning } = computeChartTimes(departure);
    expect(earlyMorning).toBe(true);
    expect(firstChart.getHours()).toBe(21);
    expect(firstChart.getDate()).toBe(31); // 31 Jul, the day before
  });

  it("always puts the final chart 30 minutes before departure", () => {
    const departure = new Date(2026, 7, 1, 5, 30);
    const { finalChart } = computeChartTimes(departure);
    expect(finalChart.getHours()).toBe(5);
    expect(finalChart.getMinutes()).toBe(0);
  });
});

describe("nextOccurrence", () => {
  it("returns today when the clock time hasn't passed yet", () => {
    const from = new Date(2026, 7, 1, 10, 0);
    const next = nextOccurrence("16:00", from);
    expect(next!.getDate()).toBe(1);
    expect(next!.getHours()).toBe(16);
  });

  it("rolls to tomorrow when the clock time has already passed", () => {
    const from = new Date(2026, 7, 1, 18, 0);
    const next = nextOccurrence("16:00", from);
    expect(next!.getDate()).toBe(2);
    expect(next!.getHours()).toBe(16);
  });

  it("returns null for a malformed time string", () => {
    expect(nextOccurrence("not-a-time")).toBeNull();
  });
});
