"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/social-icons";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; ignore silently.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const itemClass =
    "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm font-medium text-[var(--muted)] transition-colors hover:border-brand-500/40 hover:text-brand-500";

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this article">
      <span className="mr-1 text-sm text-[var(--muted)]">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="h-4 w-4" />
        LinkedIn
      </a>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="Share on X"
      >
        <XIcon className="h-4 w-4" />
        X
      </a>
      <button type="button" onClick={copyLink} className={itemClass} aria-live="polite">
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent-500" />
            Copied
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
