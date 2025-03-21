"use client";

import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: Props) {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <button
        className="px-4 py-2 bg-foreground text-background rounded"
        onClick={() => {
          setHasError(false);
          window.location.reload();
        }}
      >
        Reload page
      </button>
    </div>
  ) : (
    children
  );
}
