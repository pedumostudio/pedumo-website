import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { openSourceRepositories } from "@/lib/content";
import { hrefOf } from "@/hooks/useHashRoute";
import { formatGitHubDate, useGitHubRepositories } from "@/hooks/useGitHubRepositories";

type RepositoryGridProps = {
  variant?: "compact" | "detailed";
  showNotice?: boolean;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: value >= 1000 ? "compact" : "standard" }).format(value);
}

function integrationMessage(status: ReturnType<typeof useGitHubRepositories>["status"], liveCount: number) {
  if (status === "loading") return "Checking public GitHub repository metadata…";
  if (liveCount > 0) {
    return `Live public GitHub metadata loaded for ${liveCount} featured repository${liveCount === 1 ? "" : "ies"}. Cards without public metadata are marked Repository pending and do not show fabricated metrics.`;
  }
  return "Public GitHub metadata is unavailable right now. Repository cards remain visible with pending status and no fabricated stars, forks, language, license, updated date or contributors.";
}

export function RepositoryGrid({ variant = "detailed", showNotice = false }: RepositoryGridProps) {
  const githubState = useGitHubRepositories(openSourceRepositories);
  const detailed = variant === "detailed";
  const liveCount = Object.keys(githubState.repositories).length;

  return (
    <div className="space-y-8">
      {showNotice ? (
        <div
          className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-5 text-sm leading-relaxed text-brand-100 edge-highlight sm:p-6"
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold text-brand-100">GitHub metadata adapter</p>
          <p className="mt-2 text-brand-100/80">
            {integrationMessage(githubState.status, liveCount)}
          </p>
        </div>
      ) : null}

      <div className={detailed ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {openSourceRepositories.map((repo, i) => {
          const meta = githubState.repositories[repo.id];
          const href = meta?.htmlUrl || repo.href;
          return (
            <Reveal key={repo.id} delay={(i % 3) * 0.05}>
              <article
                id={repo.id}
                className="flex h-full scroll-mt-28 flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                    <repo.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <Badge>{repo.area}</Badge>
                </div>
                <h3 className={detailed ? "mt-5 text-2xl font-semibold tracking-tight" : "mt-5 text-xl font-semibold tracking-tight"}>
                  {repo.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {meta?.description || repo.description}
                </p>

                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--background-sunken)] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Repository
                  </p>
                  <p className="mt-1 break-words font-mono text-sm text-brand-300">
                    {meta?.fullName || repo.repoSlug}
                  </p>
                  {meta ? (
                    <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                      <div>
                        <dt className="text-[var(--muted)]">Stars</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">{formatCount(meta.stars)}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--muted)]">Forks</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">{formatCount(meta.forks)}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--muted)]">Language</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">{meta.language || "Not reported"}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--muted)]">License</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">{meta.license || "Not reported"}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--muted)]">Updated</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">{formatGitHubDate(meta.pushedAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--muted)]">Contributors</dt>
                        <dd className="mt-1 font-mono text-[var(--foreground)]">
                          {meta.contributors === null ? "Not reported" : formatCount(meta.contributors)}
                        </dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="mt-3 text-sm font-medium text-warning">Repository pending.</p>
                  )}
                </div>

                {detailed && meta ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl border border-[var(--border-strong)] px-4 py-2 text-sm font-medium transition-colors hover:border-brand-400/45 hover:bg-white/[0.04] hover:text-brand-300"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    Open on GitHub
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}

                {!detailed ? (
                  <a
                    href={hrefOf("/open-source", repo.id)}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                    aria-label={`View ${repo.name} repository details`}
                  >
                    View Repository →
                  </a>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
