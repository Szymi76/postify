import React, { forwardRef, useEffect, useState } from "react";

import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";

type ShareDropwonProps = { postId: string };
const ShareDropwon = forwardRef<HTMLDivElement, ShareDropwonProps>((props, ref) => {
  const { copied: copiedLink, copyToClipboard } = useCopyToClipboard();

  const textToBeCopied = `${location.origin}/post/${props.postId}`;

  return (
    <div ref={ref} className="layout absolute top-8 z-20 p-3">
      <div
        className="tooltip flex cursor-pointer items-center justify-center rounded-md border border-slate-200 p-1 duration-100 hover:bg-slate-100"
        onClick={() => void copyToClipboard(textToBeCopied)}
        data-tip={copiedLink ? "Skopiowano link" : "Skopiuj link postu"}
      >
        {copiedLink ? (
          <CheckIcon className="h-8 text-success" />
        ) : (
          <LinkIcon className="h-8 text-blue-500" />
        )}
      </div>
    </div>
  );
});

ShareDropwon.displayName = "ShareDropwon";
export default ShareDropwon;
