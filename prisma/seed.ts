import { PrismaClient, RiskLevel } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const indicators = [
    ["PHONE_REUSE","Phone number reuse","Identity & Contact",25,"Phone number associated with multiple applicants."],
    ["ADDRESS_REUSE","Shared address","Identity & Address",18,"Address shared with multiple customers."],
    ["DEVICE_REUSE","Device reuse","Behavioral",15,"Device fingerprint appears across applications."],
    ["INCOME_ANOMALY","Income anomaly","Financial",15,"Income inconsistent with occupation or peer group."],
    ["VELOCITY","Application velocity","Behavioral",12,"Multiple applications submitted in a short window."],
    ["DOC_DUPLICATE","Document duplication","Document",10,"Document resembles a previous submission."],
    ["GEO_MISMATCH","Geographic mismatch","Geographic",8,"Location conflicts with customer profile."],
    ["CREDIT_STRESS","Credit stress","Credit History",7,"Adverse credit history signal."]
  ] as const;
  for (const [code,name,category,weight,description] of indicators) {
    await db.fraudIndicator.upsert({ where:{code}, update:{name,category,weight,description}, create:{code,name,category,weight,description} });
  }

  const apps = [
    ["CR-10293","Andi Pratama","08120000932",8500000,120000000,94,RiskLevel.CRITICAL],
    ["CR-10281","Siti Rahma","08130000210",12000000,85000000,91,RiskLevel.CRITICAL],
    ["CR-10270","Budi Santoso","08210000112",7200000,75000000,72,RiskLevel.HIGH],
    ["CR-10265","Dewi Lestari","08570000554",15000000,150000000,64,RiskLevel.HIGH],
    ["CR-10258","Fajar Nugroho","08190000778",18000000,100000000,38,RiskLevel.MEDIUM],
    ["CR-10241","Rina Amelia","08960000221",22000000,90000000,18,RiskLevel.LOW]
  ] as const;

  for (const [applicationNo,customerName,phone,income,loan,score,riskLevel] of apps) {
    const app = await db.creditApplication.upsert({
      where:{applicationNo},
      update:{customerName,phone,monthlyIncome:income,loanAmount:loan},
      create:{applicationNo,customerName,phone,monthlyIncome:income,loanAmount:loan,purpose:"Working Capital"}
    });
    await db.fraudScore.upsert({
      where:{applicationId:app.id},
      update:{score,riskLevel,confidence:91.4},
      create:{applicationId:app.id,score,riskLevel,confidence:91.4}
    });
    if (riskLevel === "HIGH" || riskLevel === "CRITICAL") {
      const existing = await db.fraudCase.findFirst({where:{applicationId:app.id}});
      if (!existing) await db.fraudCase.create({data:{applicationId:app.id,status:"OPEN",priority:riskLevel,summary:"Seeded EWS alert"}});
    }
  }

  await db.mlModel.upsert({
    where:{id:"00000000-0000-0000-0000-000000000001"},
    update:{name:"Fraud Ensemble v1",version:"1.0.0",algorithm:"Hybrid Rules + Gradient Boosting + Anomaly"},
    create:{id:"00000000-0000-0000-0000-000000000001",name:"Fraud Ensemble v1",version:"1.0.0",algorithm:"Hybrid Rules + Gradient Boosting + Anomaly",active:true,metrics:{auc:0.93,confidence:0.914}}
  });
}

main().finally(()=>db.$disconnect());