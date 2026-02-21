import { describe, it, expect } from "vitest";
import { formatKRW, formatPercent, formatDate } from "./utils";

// Intl.NumberFormat uses U+20A9 (₩) or U+FFE7 (￧) depending on ICU data
const WON = /[\u20A9\uFFE7]/;

describe("formatKRW", () => {
  it("formats number as KRW currency", () => {
    expect(formatKRW(1000)).toMatch(new RegExp(`^${WON.source}1,000$`));
  });

  it("formats large numbers with commas", () => {
    expect(formatKRW(1234567)).toMatch(new RegExp(`^${WON.source}1,234,567$`));
  });

  it("formats string input", () => {
    expect(formatKRW("50000")).toMatch(new RegExp(`^${WON.source}50,000$`));
  });

  it("truncates decimal places", () => {
    expect(formatKRW(1234.56)).toMatch(new RegExp(`^${WON.source}1,235$`));
  });

  it("formats zero", () => {
    expect(formatKRW(0)).toMatch(new RegExp(`^${WON.source}0$`));
  });

  it("formats negative numbers", () => {
    expect(formatKRW(-5000)).toMatch(new RegExp(`^-${WON.source}5,000$`));
  });
});

describe("formatPercent", () => {
  it("formats positive number with + sign", () => {
    expect(formatPercent(12.345)).toBe("+12.35%");
  });

  it("formats negative number without extra sign", () => {
    expect(formatPercent(-3.5)).toBe("-3.50%");
  });

  it("formats zero without sign", () => {
    expect(formatPercent(0)).toBe("0.00%");
  });

  it("formats string input", () => {
    expect(formatPercent("7.1")).toBe("+7.10%");
  });

  it("returns dash for null", () => {
    expect(formatPercent(null)).toBe("\u2014");
  });

  it("returns dash for NaN string", () => {
    expect(formatPercent("abc")).toBe("\u2014");
  });
});

describe("formatDate", () => {
  it("formats ISO date string to Korean locale", () => {
    const result = formatDate("2026-01-15T00:00:00Z");
    expect(result).toContain("2026");
    expect(result).toContain("1");
    expect(result).toContain("15");
  });
});
