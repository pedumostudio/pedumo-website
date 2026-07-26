export type StatusItem = {
  name: string;
  group: "Platform" | "Security" | "Automation" | "Data";
  status: "operational" | "degraded" | "maintenance";
  uptime: string;
};

export const statusItems: StatusItem[] = [
  { name: "Marketing website", group: "Platform", status: "operational", uptime: "99.99%" },
  { name: "Consultation booking", group: "Platform", status: "operational", uptime: "99.98%" },
  { name: "API gateway", group: "Platform", status: "operational", uptime: "99.97%" },
  { name: "Edge CDN", group: "Platform", status: "operational", uptime: "100.00%" },
  { name: "Threat monitoring", group: "Security", status: "operational", uptime: "100.00%" },
  { name: "Vulnerability scanning", group: "Security", status: "operational", uptime: "99.99%" },
  { name: "Incident response", group: "Security", status: "operational", uptime: "100.00%" },
  { name: "AI automation pipelines", group: "Automation", status: "operational", uptime: "99.95%" },
  { name: "Workflow engine", group: "Automation", status: "operational", uptime: "99.96%" },
  { name: "Data pipelines", group: "Data", status: "operational", uptime: "99.94%" },
  { name: "Analytics dashboards", group: "Data", status: "operational", uptime: "99.97%" },
];

export const statusIncidents: { date: string; title: string; body: string; resolved: boolean }[] = [
  {
    date: "2026-02-22",
    title: "Scheduled maintenance · edge cache purge",
    body: "A planned edge cache purge completed within the announced window with no customer-visible impact.",
    resolved: true,
  },
  {
    date: "2026-01-15",
    title: "Elevated latency on analytics dashboards",
    body: "A misconfigured aggregation query caused elevated latency on two dashboards. Root cause fixed and query rewritten; monitoring added to prevent recurrence.",
    resolved: true,
  },
];
