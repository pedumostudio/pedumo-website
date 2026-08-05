import { useEffect, useState } from "react";

export type GitHubCommitActivity = {
  sha: string;
  message: string;
  htmlUrl: string;
  authorName: string;
  committedAt: string;
  repository: string;
};

type GitHubCommitApi = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
};

export type GitHubActivityState = {
  status: "idle" | "loading" | "ready" | "error";
  commits: GitHubCommitActivity[];
  error?: string;
};

export function useGitHubActivity(owner: string, repo: string, limit = 3) {
  const [state, setState] = useState<GitHubActivityState>({ status: "idle", commits: [] });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", commits: [] });

    fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${limit}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }
        const data = (await response.json()) as GitHubCommitApi[];
        setState({
          status: "ready",
          commits: data.map((item) => ({
            sha: item.sha,
            message: item.commit.message.split("\n")[0] || "Commit message unavailable",
            htmlUrl: item.html_url,
            authorName: item.commit.author.name,
            committedAt: item.commit.author.date,
            repository: `${owner}/${repo}`,
          })),
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          commits: [],
          error: error instanceof Error ? error.message : "GitHub activity request failed",
        });
      });

    return () => controller.abort();
  }, [owner, repo, limit]);

  return state;
}

export function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
