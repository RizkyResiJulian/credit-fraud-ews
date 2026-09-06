# CreditGuard EWS — v1

Modern Credit Fraud Early Warning System built with Next.js, TypeScript, Prisma, PostgreSQL and Docker.

## Included in v1

- Modern dark EWS dashboard
- Credit application list/detail
- Manual credit entry
- Live rule-based fraud scoring 0–100
- Risk classification: LOW / MEDIUM / HIGH / CRITICAL
- Explainable contributing indicators
- Fraud case queue
- Indicator/rule library
- ML intelligence placeholder with feature importance/anomaly views
- Fraud network visualization starter
- CSV import endpoint and upload UI
- PostgreSQL schema for customers, applications, scores, cases, imports, indicators, rules, ML models and audit logs
- Docker Compose for PostgreSQL + pgAdmin

## Requirements

- Node.js 22+
- Docker Desktop

## Quick start

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL:

```bash
docker compose up -d
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Create/update database:

```bash
npx prisma db push
```

6. Seed demo data:

```bash
npm run db:seed
```

7. Start the app:

```bash
npm run dev
```

Open http://localhost:3000

pgAdmin: http://localhost:5050
- Email: admin@local.test
- Password: admin123

## Production roadmap

The starter intentionally keeps the first version simple. For production, add:

1. Authentication + RBAC (NextAuth/Auth.js or enterprise IdP).
2. Background ingestion worker using Redis/BullMQ.
3. XLSX parser (ExcelJS/SheetJS), DOCX parser, PDF text extraction and OCR.
4. Python ML service (FastAPI) with XGBoost/LightGBM + Isolation Forest.
5. Feature store and model registry.
6. SHAP-based explanations.
7. Graph database or PostgreSQL graph strategy for entity relationships.
8. Object storage (S3/MinIO) for raw files.
9. Full audit/event log and data lineage.
10. Monitoring, model drift, threshold governance, rate limiting and encryption.

## Important

Do not use the demo credentials or default passwords in production. Fraud models should be validated on representative historical data, calibrated, monitored for drift, and reviewed by authorized risk/fraud personnel before being used for consequential credit decisions.
