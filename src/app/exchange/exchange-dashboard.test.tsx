import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExchangeDashboard } from "./exchange-dashboard";

vi.mock("@/hooks/use-connection");
vi.mock("@/hooks/use-exchange");
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

import { useConnection } from "@/hooks/use-connection";
import { useUpbitBalances, useKisBalance } from "@/hooks/use-exchange";

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

function mockConnected() {
  vi.mocked(useConnection).mockReturnValue({
    isConnected: true,
    connection: { url: "http://localhost:8000", token: "test" },
    save: vi.fn(),
    clear: vi.fn(),
    getRecent: vi.fn(() => []),
  });
}

function mockLoading() {
  vi.mocked(useUpbitBalances).mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  } as ReturnType<typeof useUpbitBalances>);
  vi.mocked(useKisBalance).mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  } as ReturnType<typeof useKisBalance>);
}

describe("ExchangeDashboard", () => {
  beforeEach(() => {
    mockConnected();
    mockLoading();
  });

  it("renders page title", () => {
    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    expect(
      screen.getByRole("heading", { level: 1, name: "거래소" })
    ).toBeInTheDocument();
  });

  it("renders both section headers", () => {
    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    const headings = screen.getAllByRole("heading", { level: 2 });
    const texts = headings.map((h) => h.textContent);
    expect(texts).toContain("업비트 잔고");
    expect(texts).toContain("한국투자증권 잔고");
  });

  it("shows loading skeletons", () => {
    const { container } = render(<ExchangeDashboard />, {
      wrapper: createWrapper(),
    });

    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("shows error message for generic error", () => {
    vi.mocked(useUpbitBalances).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Network error"),
    } as ReturnType<typeof useUpbitBalances>);

    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows credential setup message for 400 error", async () => {
    const { ApiError } = await import("@/lib/api");

    vi.mocked(useUpbitBalances).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new ApiError(400, { detail: "credentials not configured" }),
    } as ReturnType<typeof useUpbitBalances>);

    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    expect(
      screen.getByText(/업비트 인증 정보가 설정되지 않았습니다/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("kubera-core credential add upbit")
    ).toBeInTheDocument();
  });

  it("renders balance data when loaded", () => {
    vi.mocked(useUpbitBalances).mockReturnValue({
      data: [
        {
          currency: "BTC",
          balance: "1.0",
          locked: "0",
          avg_buy_price: "50000000",
          avg_buy_price_modified: false,
          unit_currency: "KRW",
        },
      ],
      isLoading: false,
      error: null,
    } as ReturnType<typeof useUpbitBalances>);

    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("shows connection guard when disconnected", () => {
    vi.mocked(useConnection).mockReturnValue({
      isConnected: false,
      connection: null,
      save: vi.fn(),
      clear: vi.fn(),
      getRecent: vi.fn(() => []),
    });

    render(<ExchangeDashboard />, { wrapper: createWrapper() });

    expect(screen.getByText("서버 미연결")).toBeInTheDocument();
  });
});
