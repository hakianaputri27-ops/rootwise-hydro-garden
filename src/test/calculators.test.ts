import { describe, expect, it } from "vitest";

import { calculateNutrientMix, ecToPpm, estimatePlantCapacity, ppmToEc } from "@/lib/calculators";
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
  });

  it("uses the selected unit preference for garden distances", () => {
    expect(formatLength(20, "metric")).toBe("20 cm");
    expect(formatLength(20, "imperial")).toBe("7.9 in");
  });
});