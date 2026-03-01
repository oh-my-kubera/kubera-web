import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KisBalanceTable } from "./kis-balance-table";

const SUMMARY = {
  tot_evlu_amt: "15000000",
  pchs_amt_smtl_amt: "12000000",
  evlu_pfls_smtl_amt: "3000000",
  holdings: [
    {
      pdno: "005930",
      prdt_name: "삼성전자",
      hldg_qty: "100",
      pchs_avg_pric: "60000",
      prpr: "75000",
      evlu_amt: "7500000",
      evlu_pfls_rt: "25.00",
    },
    {
      pdno: "035720",
      prdt_name: "카카오",
      hldg_qty: "50",
      pchs_avg_pric: "90000",
      prpr: "80000",
      evlu_amt: "4000000",
      evlu_pfls_rt: "-11.11",
    },
  ],
};

describe("KisBalanceTable", () => {
  it("renders stock rows", () => {
    render(<KisBalanceTable summary={SUMMARY} />);

    expect(screen.getByText("삼성전자")).toBeInTheDocument();
    expect(screen.getByText("005930")).toBeInTheDocument();
    expect(screen.getByText("카카오")).toBeInTheDocument();
    expect(screen.getByText("035720")).toBeInTheDocument();
  });

  it("renders all column headers", () => {
    render(<KisBalanceTable summary={SUMMARY} />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(6);
    expect(headers[0]).toHaveTextContent("종목");
    expect(headers[1]).toHaveTextContent("수량");
    expect(headers[2]).toHaveTextContent("매입가");
    expect(headers[3]).toHaveTextContent("현재가");
    expect(headers[4]).toHaveTextContent("평가금액");
    expect(headers[5]).toHaveTextContent("수익률");
  });

  it("applies profit color for positive profit", () => {
    const { container } = render(<KisBalanceTable summary={SUMMARY} />);

    const profitCells = container.querySelectorAll('[class*="--stock-profit"]');
    expect(profitCells.length).toBeGreaterThan(0);
  });

  it("applies loss color for negative profit", () => {
    const { container } = render(<KisBalanceTable summary={SUMMARY} />);

    const lossCells = container.querySelectorAll('[class*="--stock-loss"]');
    expect(lossCells.length).toBeGreaterThan(0);
  });

  it("renders footer with totals", () => {
    render(<KisBalanceTable summary={SUMMARY} />);

    const footerRow = screen.getAllByRole("row").at(-1)!;
    expect(footerRow).toHaveTextContent(/총 평가금액/);
  });

  it("shows empty state when no holdings", () => {
    const emptySummary = {
      ...SUMMARY,
      holdings: [],
    };

    render(<KisBalanceTable summary={emptySummary} />);

    expect(screen.getByText("보유 종목이 없습니다")).toBeInTheDocument();
  });
});
