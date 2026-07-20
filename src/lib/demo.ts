export type DemoTab = "analytics" | "crm" | "security" | "ai";

export const demoKpis = {
  analytics: [
    { label: "Active users", value: "48,214", delta: "+12.4%" },
    { label: "Conversion", value: "4.82%", delta: "+0.6 pts" },
    { label: "p95 latency", value: "142 ms", delta: "-18 ms" },
    { label: "Error rate", value: "0.04%", delta: "-0.01 pts" },
  ],
  crm: [
    { label: "Open deals", value: "312", delta: "+24" },
    { label: "Pipeline", value: "$4.8M", delta: "+8.2%" },
    { label: "Win rate", value: "28.6%", delta: "+1.4 pts" },
    { label: "Avg. cycle", value: "32 days", delta: "-3 days" },
  ],
  security: [
    { label: "Findings (open)", value: "7", delta: "-3" },
    { label: "Critical", value: "0", delta: "—" },
    { label: "Scan coverage", value: "100%", delta: "—" },
    { label: "MTTR", value: "4.1 h", delta: "-0.8 h" },
  ],
  ai: [
    { label: "Tasks automated", value: "12,840", delta: "+2,104" },
    { label: "Human reviews", value: "6.2%", delta: "-1.1 pts" },
    { label: "Accuracy", value: "94.7%", delta: "+0.9 pts" },
    { label: "Cost / task", value: "$0.018", delta: "-$0.004" },
  ],
} as const;

export const demoChartSeries: Record<DemoTab, number[]> = {
  analytics: [42, 48, 51, 47, 58, 62, 70, 68, 74, 81, 88, 92],
  crm: [12, 18, 22, 19, 26, 30, 28, 34, 38, 42, 47, 51],
  security: [22, 18, 20, 14, 12, 9, 11, 8, 7, 6, 7, 5],
  ai: [120, 240, 380, 520, 680, 820, 980, 1180, 1420, 1680, 1920, 2240],
};

export const demoTableRows: Record<DemoTab, { name: string; region: string; status: string; value: string }[]> = {
  analytics: [
    { name: "EU · Frankfurt", region: "eu-central-1", status: "Operational", value: "99.99%" },
    { name: "US · Virginia", region: "us-east-1", status: "Operational", value: "99.98%" },
    { name: "APAC · Singapore", region: "ap-southeast-1", status: "Operational", value: "99.97%" },
    { name: "SA · São Paulo", region: "sa-east-1", status: "Degraded", value: "99.72%" },
  ],
  crm: [
    { name: "Northwind Traders", region: "Enterprise", status: "Negotiation", value: "$420k" },
    { name: "Contoso Group", region: "Enterprise", status: "Proposal", value: "$310k" },
    { name: "Fabrikam Ltd", region: "Mid-Market", status: "Discovery", value: "$85k" },
    { name: "Adventure Works", region: "Mid-Market", status: "Won", value: "$140k" },
  ],
  security: [
    { name: "auth-service", region: "prod", status: "Clear", value: "0 findings" },
    { name: "billing-api", region: "prod", status: "Review", value: "2 medium" },
    { name: "edge-gateway", region: "prod", status: "Clear", value: "0 findings" },
    { name: "analytics-worker", region: "prod", status: "Patched", value: "1 low" },
  ],
  ai: [
    { name: "Invoice triage", region: "finance", status: "Live", value: "96.1% accuracy" },
    { name: "Support routing", region: "support", status: "Live", value: "93.8% accuracy" },
    { name: "Contract review", region: "legal", status: "Shadow", value: "91.2% accuracy" },
    { name: "Lead scoring", region: "sales", status: "Live", value: "89.4% accuracy" },
  ],
};

export const demoActivity: { time: string; actor: string; action: string }[] = [
  { time: "09:42", actor: "system", action: "Deployed edge-gateway v2.14.1 to production." },
  { time: "09:31", actor: "b.alogun", action: "Approved change request CR-2041 (billing-api)." },
  { time: "09:18", actor: "ai-triage", action: "Auto-resolved 42 support tickets (confidence > 0.92)." },
  { time: "08:59", actor: "scanner", action: "Completed dependency scan: 0 critical, 1 low." },
  { time: "08:40", actor: "ops", action: "Rotated production signing keys (scheduled)." },
];
