import { AlertCircle, GitCommitHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { openSourceRepositories } from "@/lib/content";
import { formatActivityDate, useGitHubActivity } from "@/hooks/useGitHubActivity";

const activityRepository = openSourceRepositories.find((repo) => repo.id === "pedumo-website");
const pendingRepositories = openSourceRepositories.filter((repo) => repo.id !== "pedumo-website");

export function EngineeringActivityFeed() {
  const activity = useGitHubActivity("pedumo", "pedumo-website", 3);

  return (
    <div className="space-y-3" aria-live="polite">
      {activity.status === "loading" ? (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)] edge-highlight">
          Checking public GitHub activity…
        </div>
      ) : null}

      {activity.status === "ready" && activity.commits.length > 0
        ? activity.commits.map((commit, i) => (
            <Reveal key={commit.sha} delay={i * 0.04}>
              <article className="rounded-3xl border border-accent-500/25 bg-accent-500/10 p-5 edge-highlight">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-accent-500/25 bg-accent-500/10 text-accent-300">
                      <GitCommitHorizontal className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{commit.message}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                        {commit.repository} · {formatActivityDate(commit.committedAt)} · {commit.authorName}
                      </p>
                    </div>
                  </div>
                  <Badge>Live GitHub</Badge>
                </div>
                <a
                  href={commit.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                  aria-label={`Open commit ${commit.sha.slice(0, 7)} on GitHub`}
                >
                  View commit →
                </a>
              </article>
            </Reveal>
          ))
        : null}

      {activity.status === "ready" && activity.commits.length === 0 ? (
        <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5 text-sm text-[var(--muted)] edge-highlight">
          No public commits were returned by GitHub for {activityRepository?.repoSlug || "pedumo/pedumo-website"}.
        </div>
      ) : null}

      {activity.status === "error" ? (
        <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5 text-sm leading-relaxed text-[var(--muted)] edge-highlight">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
            <div>
              <p className="font-semibold text-[var(--foreground)]">GitHub activity unavailable.</p>
              <p className="mt-1">I could not verify live commit activity from the public GitHub API.</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {pendingRepositories.slice(0, 4).map((repo) => (
          <div
            key={repo.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm edge-highlight"
          >
            <p className="font-medium text-[var(--foreground)]">{repo.name}</p>
            <p className="mt-1 text-[var(--muted)]">Repository pending.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
