import type { AppSettings } from "@/lib/app-storage";

export function formatLength(centimeters: number, units: AppSettings["units"]) {
  if (!Number.isFinite(centimeters)) return units === "metric" ? "— cm" : "— in";
  if (units === "metric") {
    return `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(centimeters)} cm`;
  }
  return `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(centimeters / 2.54)} in`;
}

export function formatCurrency(amount: number, currency: AppSettings["currency"]) {
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}