import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "File is required" }, { status: 400 });
  const name = file.name.toLowerCase();
  if (!name.endsWith(".csv")) {
    return NextResponse.json({ valid: 0, errors: 0, alerts: 0, message: "XLSX diterima sebagai file input, tetapi parser XLSX belum diaktifkan pada starter ini. Tambahkan SheetJS/ExcelJS pada ingestion worker untuk produksi." });
  }
  const text = await file.text();
  const parsed = Papa.parse<Record<string,string>>(text, { header: true, skipEmptyLines: true });
  const rows = parsed.data;
  const headers = parsed.meta.fields ?? [];
  let alerts = 0;
  for (const row of rows) {
    const phone = Object.entries(row).find(([k]) => /phone|telepon|hp/i.test(k))?.[1];
    if (phone && rows.filter(r => Object.values(r).includes(phone)).length > 1) alerts++;
  }
  return NextResponse.json({ valid: rows.length, errors: parsed.errors.length, alerts, headers, message: `Detected ${headers.length} columns. Data normalization dan persistence dapat dihubungkan ke worker berikutnya.` });
}