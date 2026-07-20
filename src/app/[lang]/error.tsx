"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">🚦</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Signal failure</h1>
      <p className="mt-2 text-muted">
        Something went wrong on our end. This one&apos;s on us — try again, or head back home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <button type="button" onClick={reset} className="btn-primary">Try Again</button>
        <Link href="/" className="btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}
