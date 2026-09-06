export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Indicator = {
  code: string;
  name: string;
  category: string;
  weight: number;
  description: string;
};

export type Application = {
  id: string;
  applicationNo: string;
  customerName: string;
  phone: string;
  income: number;
  loanAmount: number;
  purpose: string;
  score: number;
  risk: RiskLevel;
  indicators: { name: string; contribution: number; severity: string }[];
  createdAt: string;
};