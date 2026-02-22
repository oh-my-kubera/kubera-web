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

export function formatKRWCompact(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "\u2014";

  if (Math.abs(num) >= 100000000) {
    const eok = Math.floor(Math.abs(num) / 100000000);
    const man = Math.floor((Math.abs(num) % 100000000) / 10000);
    const sign = num < 0 ? "-" : "";

    if (man > 0) {
      return `${sign}${eok}억 ${man.toLocaleString("ko-KR")}만 원`;
    }
    return `${sign}${eok}억 원`;
  } else if (Math.abs(num) >= 10000) {
    const man = Math.floor(Math.abs(num) / 10000);
    const sign = num < 0 ? "-" : "";
    return `${sign}${man.toLocaleString("ko-KR")}만 원`;
  }

  return krwFormatter.format(num);
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
