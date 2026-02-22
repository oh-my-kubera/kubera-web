# Snapshot Components

## Dashboard
- `summary-cards` — net worth accent card + 3-col grid (assets, liabilities, credit score). Reused in detail page.
- `net-worth-chart` — Recharts LineChart: net_worth (solid), assets/liabilities (dashed). Requires 2+ trend points.
- `snapshot-list` — history list with links to detail pages. Shows date, source badge, net worth, credit score.
- `import-modal` — Dialog with drag & drop xlsx upload, optional password, success/error states.

## Detail Report
- `asset-allocation` — aggregates asset entries by category. Donut chart + breakdown table.
- `investment-table` — investment portfolio with return rate coloring (positive/negative).
- `loan-table` — loan entries with balance, interest rate, end date.
- `insurance-table` — insurance entries with status badge and period.

## Conventions
- All amount fields are string (Decimal from backend) — `parseFloat()` before display/chart
- Formatting via `formatKRW`, `formatPercent`, `formatDate` from `@/lib/utils`
- Chart colors use CSS variables: `--chart-1` through `--chart-5`
