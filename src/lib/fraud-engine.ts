import { RiskLevel, Indicator } from "./types";

export const INDICATORS: Indicator[] = [
  { code: "PHONE_REUSE", name: "Phone number reuse", category: "Identity & Contact", weight: 25, description: "Phone number is associated with multiple applicants." },
  { code: "ADDRESS_REUSE", name: "Shared address", category: "Identity & Address", weight: 18, description: "Address is shared with multiple customers." },
  { code: "DEVICE_REUSE", name: "Device reuse", category: "Behavioral", weight: 15, description: "Same device fingerprint appears across applications." },
  { code: "INCOME_ANOMALY", name: "Income anomaly", category: "Financial", weight: 15, description: "Income is inconsistent with declared occupation or peer group." },
  { code: "VELOCITY", name: "Application velocity", category: "Behavioral", weight: 12, description: "Multiple applications were submitted in a short window." },
  { code: "DOC_DUPLICATE", name: "Document duplication", category: "Document", weight: 10, description: "Document hash resembles a previously submitted document." },
  { code: "GEO_MISMATCH", name: "Geographic mismatch", category: "Geographic", weight: 8, description: "Application location conflicts with profile." },
  { code: "CREDIT_STRESS", name: "Credit stress", category: "Credit History", weight: 7, description: "High delinquency / adverse credit history signal." },
];

export function classifyRisk(score: number): RiskLevel {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 30) return "MEDIUM";
  return "LOW";
}

export function scoreApplication(input: {
  phoneReuse?: number;
  addressReuse?: number;
  deviceReuse?: number;
  incomeAnomaly?: boolean;
  velocity?: boolean;
  documentDuplicate?: boolean;
  geoMismatch?: boolean;
  creditStress?: boolean;
}) {
  const factors: { name: string; contribution: number; severity: string }[] = [];
  const add = (name: string, contribution: number, severity = "HIGH") => {
    if (contribution > 0) factors.push({ name, contribution, severity });
  };

  add("Phone number reuse", Math.min(input.phoneReuse ?? 0, 4) * 6.25);
  add("Shared address", Math.min(input.addressReuse ?? 0, 3) * 6);
  add("Device reuse", Math.min(input.deviceReuse ?? 0, 3) * 5);
  if (input.incomeAnomaly) add("Income anomaly", 15);
  if (input.velocity) add("Application velocity", 12);
  if (input.documentDuplicate) add("Document duplication", 10);
  if (input.geoMismatch) add("Geographic mismatch", 8);
  if (input.creditStress) add("Credit stress", 7);

  const score = Math.min(100, Math.round(factors.reduce((a, b) => a + b.contribution, 0)));
  return { score, risk: classifyRisk(score), factors };
}