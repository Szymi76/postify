import React, { forwardRef, useEffect, useState } from "react";

import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";
import { PAGES } from "~/constants";

type CopyLinkButtonProps = { postId: string };
const CopyLinkButton = (props: CopyLinkButtonProps) => {
  const { copied: copiedLink, copyToClipboard } = useCopyToClipboard();

  return (
    <div
      className="tooltip"
      onClick={() => void copyToClipboard(PAGES.POST(props.postId))}
      data-tip={copiedLink ? "Skopiowano link" : "Skopiuj link postu"}
    >
      {copiedLink ? (
        <CheckIcon className="h-8 text-success" />
      ) : (
        <LinkIcon className="h-8 text-blue-500" />
      )}
    </div>
  );
};

export default CopyLinkButton;
