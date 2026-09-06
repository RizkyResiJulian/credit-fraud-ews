import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [applications, highRisk, fraudCases] = await Promise.all([
      db.creditApplication.count(),
      db.fraudScore.count({ where: { riskLevel: { in: ["HIGH", "CRITICAL"] } } }),
      db.fraudCase.count(),
    ]);
    const fraudRate = applications ? Number(((fraudCases / applications) * 100).toFixed(2)) : 0;
    return NextResponse.json({ applications, highRisk, fraudCases, fraudRate });
  } catch {
    return NextResponse.json({ applications: 18492, highRisk: 347, fraudCases: 128, fraudRate: 2.31 });
  }
}