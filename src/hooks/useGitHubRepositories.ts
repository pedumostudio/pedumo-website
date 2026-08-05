import { useEffect, useMemo, useState } from "react";
import type { OpenSourceRepository } from "@/lib/content";

export type GitHubRepositoryMeta = {
  fullName: string;
  htmlUrl: string;
  description: string | null;
  pushedAt: string | null;
  updatedAt: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  archived: boolean;
};

type GitHubApiRepository = {
  full_name: string;
  html_url: string;
  description: string | null;
  pushed_at: string | null;
  updated_at: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  archived: boolean;
};

export type GitHubRepositoryState = {
  status: "idle" | "loading" | "ready" | "partial" | "error";
  repositories: Record<string, GitHubRepositoryMeta>;
};

async function fetchRepositoryMeta(repo: OpenSourceRepository, signal: AbortSignal) {
  const response = await fetch(
    `https://api.github.com/repos/${repo.githubOwner}/${repo.githubRepo}`,
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status} for ${repo.repoSlug}`);
  }

  const data = (await response.json()) as GitHubApiRepository;
  return {
    id: repo.id,
    meta: {
      fullName: data.full_name,
      htmlUrl: data.html_url,
      description: data.description,
      pushedAt: data.pushed_at,
      updatedAt: data.updated_at,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      language: data.language,
      archived: data.archived,
    } satisfies GitHubRepositoryMeta,
  };
}

export function useGitHubRepositories(repositories: OpenSourceRepository[]) {
  const repoKeys = useMemo(
    () => repositories.map((repo) => `${repo.githubOwner}/${repo.githubRepo}`).join("|"),
    [repositories],
  );

  const [state, setState] = useState<GitHubRepositoryState>({
    status: "idle",
    repositories: {},
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ status: "loading", repositories: current.repositories }));

    Promise.allSettled(repositories.map((repo) => fetchRepositoryMeta(repo, controller.signal)))
      .then((results) => {
        if (controller.signal.aborted) return;

        const next: Record<string, GitHubRepositoryMeta> = {};
        let failures = 0;

        for (const result of results) {
          if (result.status === "fulfilled") {
            if (result.value) next[result.value.id] = result.value.meta;
          } else {
            failures += 1;
          }
        }

        setState({
          status: failures > 0 ? "partial" : "ready",
          repositories: next,
        });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setState({ status: "error", repositories: {} });
      });

    return () => controller.abort();
    // `repoKeys` intentionally collapses the repository identity list into a stable primitive.
  }, [repoKeys, repositories]);

  return state;
}

export function formatGitHubDate(value: string | null) {
  if (!value) return "Not reported";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
