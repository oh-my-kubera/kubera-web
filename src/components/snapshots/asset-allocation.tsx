"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatKRW } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type AssetEntry = components["schemas"]["AssetEntryResponse"];

interface AssetAllocationProps {
  entries: AssetEntry[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export function AssetAllocation({ entries }: AssetAllocationProps) {
  const categoryMap = new Map<string, number>();
  for (const entry of entries) {
    const prev = categoryMap.get(entry.category) ?? 0;
    categoryMap.set(entry.category, prev + parseFloat(entry.amount));
  }

  const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);
  const data: CategoryData[] = Array.from(categoryMap.entries()).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    })
  );

  data.sort((a, b) => b.amount - a.amount);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Donut chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: 12,
              }}
              formatter={(value: number | undefined) => [formatKRW(value ?? 0), "금액"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={item.category} className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm">{item.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm">{formatKRW(item.amount)}</span>
              <span className="w-14 text-right font-mono text-xs text-muted-foreground">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
