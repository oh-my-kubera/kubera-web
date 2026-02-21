import type { Metadata } from "next";
import { ExchangeDashboard } from "./exchange-dashboard";

export const metadata: Metadata = {
  title: "Exchange | Kubera",
};

export default function ExchangePage() {
  return <ExchangeDashboard />;
}
