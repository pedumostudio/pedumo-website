"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-3xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-4 text-[var(--muted)]">
          An unexpected error occurred while loading this page.
        </p>

        <Button
          onClick={reset}
          className="mt-8"
        >
          Try Again
        </Button>
      </div>
    </main>
  );
}