"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatKRW, formatDate } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type TrendPoint = components["schemas"]["TrendPointResponse"];

interface NetWorthChartProps {
  data: TrendPoint[];
}

export function NetWorthChart({ data }: NetWorthChartProps) {
  const chartData = data.map((d) => ({
    date: d.snapshot_date,
    net_worth: parseFloat(d.net_worth),
    total_assets: parseFloat(d.total_assets),
    total_liabilities: parseFloat(d.total_liabilities),
  }));

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Net Worth Trend
      </p>
      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              stroke="hsl(var(--border))"
            />
            <YAxis
              tickFormatter={(v: number) => formatKRW(v)}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              stroke="hsl(var(--border))"
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: 12,
              }}
              labelFormatter={(label) => formatDate(String(label))}
              formatter={(value: number | undefined, name: string | undefined) => {
                const label =
                  name === "net_worth"
                    ? "Net Worth"
                    : name === "total_assets"
                      ? "Assets"
                      : "Liabilities";
                return [formatKRW(value ?? 0), label];
              }}
            />
            <Line
              type="monotone"
              dataKey="net_worth"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="total_assets"
              stroke="hsl(var(--chart-2))"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="total_liabilities"
              stroke="hsl(var(--chart-5))"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 4"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
