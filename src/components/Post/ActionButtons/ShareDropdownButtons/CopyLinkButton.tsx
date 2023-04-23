import React from "react";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";

import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

type CopyLinkButtonProps = { href: string };
const CopyLinkButton = (props: CopyLinkButtonProps) => {
  const { copied: copiedLink, copyToClipboard } = useCopyToClipboard();

  return (
    <div
      className="tooltip"
      onClick={() => void copyToClipboard(props.href)}
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
