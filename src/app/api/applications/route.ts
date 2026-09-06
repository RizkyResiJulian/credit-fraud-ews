import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scoreApplication } from "@/lib/fraud-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = scoreApplication({
      phoneReuse: Number(body.phoneReuse),
      addressReuse: Number(body.addressReuse),
      deviceReuse: Number(body.deviceReuse),
      incomeAnomaly: Boolean(body.incomeAnomaly),
      velocity: Boolean(body.velocity),
      documentDuplicate: Boolean(body.documentDuplicate),
      geoMismatch: Boolean(body.geoMismatch),
      creditStress: Boolean(body.creditStress),
    });
    const application = await db.creditApplication.create({
      data: {
        applicationNo: `CR-${Date.now().toString().slice(-6)}`,
        customerName: body.name,
        phone: body.phone,
        monthlyIncome: Number(body.income),
        loanAmount: Number(body.loan),
        purpose: body.purpose,
        fraudScore: { create: { score: result.score, riskLevel: result.risk } },
      },
    });
    if (result.risk === "HIGH" || result.risk === "CRITICAL") {
      await db.fraudCase.create({ data: { applicationId: application.id, status: "OPEN", priority: result.risk, summary: result.factors.map(x=>x.name).join(", ") } });
    }
    return NextResponse.json(application, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save application", detail: String(e) }, { status: 400 });
  }
}