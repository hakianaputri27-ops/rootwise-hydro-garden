import { describe, expect, it } from "vitest";

import { calculateNutrientMix, ecToPpm, estimateHarvest, estimatePlantCapacity, ppmToEc } from "@/lib/calculators";
import { formatLength } from "@/lib/formatters";

describe("hydroponics calculations", () => {
  it("calculates the brief's 10 L nutrient example", () => {
    expect(calculateNutrientMix(10, 5, 5)).toEqual({ nutrientAml: 50, nutrientBml: 50 });
  });

  it("converts EC using both common PPM scales", () => {
    expect(ecToPpm(1, "500")).toBe(500);
    expect(ecToPpm(1, "700")).toBe(700);
    expect(ppmToEc(700, "700")).toBe(1);
  });

  it("estimates plant capacity from crop spacing", () => {
    expect(estimatePlantCapacity(1, 0.6, 20)).toBe(15);
    expect(estimatePlantCapacity(1, 0.6, 0)).toBe(0);
    expect(estimatePlantCapacity(1, 0.6, Number.NaN)).toBe(0);
  });

  it("calculates a crop timeline using calendar days", () => {
    expect(estimateHarvest("2026-03-01", 35, new Date("2026-03-15T00:00:00Z"))).toEqual({
      harvestDate: "2026-04-05",
      daysRemaining: 21,
      daysElapsed: 14,
      progressPercent: 40,
    });
    expect(estimateHarvest("2026-02-30", 35, new Date("2026-03-15T00:00:00Z"))).toBeNull();
  });

  it("uses the selected unit preference for garden distances", () => {
    expect(formatLength(20, "metric")).toBe("20 cm");
    expect(formatLength(20, "imperial")).toBe("7.9 in");
  });
});