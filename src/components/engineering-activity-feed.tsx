import { GitCommitHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { engineeringActivity, openSourceRepositories } from "@/lib/content";
import { formatGitHubDate, useGitHubRepositories } from "@/hooks/useGitHubRepositories";

const activityRepositories = openSourceRepositories.filter((repo) => repo.id === "pedumo-website");

export function EngineeringActivityFeed() {
  const { repositories } = useGitHubRepositories(activityRepositories);
  const websiteMeta = repositories["pedumo-website"];

  return (
    <div className="space-y-3">
      {websiteMeta ? (
        <Reveal>
          <article className="rounded-3xl border border-accent-500/25 bg-accent-500/10 p-5 edge-highlight">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-accent-500/25 bg-accent-500/10 text-accent-300">
                  <GitCommitHorizontal className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">Updated PEDUMO Website</h3>
              </div>
              <Badge>Live GitHub</Badge>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Public repository metadata reports the latest push on {formatGitHubDate(websiteMeta.pushedAt)}.
            </p>
          </article>
        </Reveal>
      ) : null}

      {engineeringActivity.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.04}>
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 edge-highlight">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <Badge>{item.area}</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
