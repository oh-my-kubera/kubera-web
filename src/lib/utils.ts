import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const krwFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function formatKRW(value: string | number): string {
  return krwFormatter.format(typeof value === "string" ? parseFloat(value) : value);
}

export function formatPercent(value: string | number | null): string {
  if (value === null || value === undefined) return "\u2014";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "\u2014";
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(2)}%`;
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("ko-KR");
}
