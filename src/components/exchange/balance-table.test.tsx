import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BalanceTable } from "./balance-table";

const BALANCES = [
  {
    currency: "KRW",
    balance: "1000000",
    locked: "0",
    avg_buy_price: "0",
    avg_buy_price_modified: false,
    unit_currency: "KRW",
  },
  {
    currency: "BTC",
    balance: "0.5",
    locked: "0.1",
    avg_buy_price: "50000000",
    avg_buy_price_modified: false,
    unit_currency: "KRW",
  },
];

describe("BalanceTable", () => {
  it("renders currency rows", () => {
    render(<BalanceTable balances={BALANCES} />);

    expect(screen.getByText("KRW")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("renders all column headers", () => {
    render(<BalanceTable balances={BALANCES} />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent("통화");
    expect(headers[1]).toHaveTextContent("보유량");
    expect(headers[2]).toHaveTextContent("잠김");
    expect(headers[3]).toHaveTextContent("매수 평균가");
    expect(headers[4]).toHaveTextContent("평가금액");
  });

  it("shows dash for fiat avg price", () => {
    render(<BalanceTable balances={BALANCES} />);

    const rows = screen.getAllByRole("row");
    const krwRow = rows[1];
    expect(krwRow).toHaveTextContent("—");
  });

  it("shows empty state when all balances are zero", () => {
    const zeroBalances = [
      {
        currency: "KRW",
        balance: "0",
        locked: "0",
        avg_buy_price: "0",
        avg_buy_price_modified: false,
        unit_currency: "KRW",
      },
    ];

    render(<BalanceTable balances={zeroBalances} />);

    expect(screen.getByText("보유 자산이 없습니다")).toBeInTheDocument();
  });

  it("shows empty state for empty array", () => {
    render(<BalanceTable balances={[]} />);

    expect(screen.getByText("보유 자산이 없습니다")).toBeInTheDocument();
  });

  it("renders footer with total value", () => {
    render(<BalanceTable balances={BALANCES} />);

    const footer = screen.getAllByRole("row").at(-1)!;
    expect(footer).toHaveTextContent("총 평가금액");
  });

  it("shows locked amount for BTC row", () => {
    render(<BalanceTable balances={BALANCES} />);

    const btcRow = screen.getByText("BTC").closest("tr")!;
    // locked column should not show "—" (meaning it has a value)
    const cells = within(btcRow).getAllByRole("cell");
    // cells: currency, balance, locked, avg_price, eval_amount
    expect(cells[2]).not.toHaveTextContent("—");
  });
});
