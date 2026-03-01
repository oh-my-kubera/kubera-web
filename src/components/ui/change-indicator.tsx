import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatPercent, cn } from "@/lib/utils";

interface ChangeIndicatorProps {
  diff: number;
  percent: number | null;
  invertColor?: boolean;
  unit?: string;
}

export function ChangeIndicator({
  diff,
  percent,
  invertColor,
  unit,
}: ChangeIndicatorProps) {
  const isZero = diff === 0;
  const isGood = invertColor ? diff < 0 : diff > 0;
  const Icon = isZero ? Minus : isGood ? TrendingUp : TrendingDown;
  const colorClass = isZero
    ? "text-muted-foreground"
    : isGood
      ? "text-[hsl(var(--positive))]"
      : "text-[hsl(var(--negative))]";

  const label = unit
    ? `${diff > 0 ? "+" : ""}${diff}${unit}`
    : formatPercent(percent);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        colorClass,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
