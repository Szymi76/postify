import { useEffect, useState } from "react";

type Options = { timeout?: number };
export const useCopyToClipboard = (options?: Options) => {
  const [copied, setCopied] = useState(false);

  const timeout = options?.timeout ?? 2500;

  const copyToClipboard = async (textToBeCopied: string) => {
    await navigator.clipboard.writeText(textToBeCopied);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;

    const handler = setTimeout(() => setCopied(false), timeout);

    return () => clearTimeout(handler);
  }, [copied]);

  return { copied, copyToClipboard } as const;
};
