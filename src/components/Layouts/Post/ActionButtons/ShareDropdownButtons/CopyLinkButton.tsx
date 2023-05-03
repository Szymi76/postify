import React from "react";
import { useCopyToClipboard } from "~/hooks";

import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { Icon, Tooltip } from "~/components/Shared";
import styled from "styled-components";

type CopyLinkButtonProps = { href: string };
const CopyLinkButton = (props: CopyLinkButtonProps) => {
  const { copied: copiedLink, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip id="CopyLinkButton" content={copiedLink ? "Skopiowano link" : "Skopiuj link postu"}>
      <Icon onClick={() => void copyToClipboard(props.href)}>
        {copiedLink ? <CheckIcon color="#4BB543" /> : <StyledLinkIcon />}
      </Icon>
    </Tooltip>
  );
};

export default CopyLinkButton;

const StyledLinkIcon = styled(LinkIcon)`
  color: ${props => props.theme.palette.primary};
`;
