import { type Ref, forwardRef } from "react";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import { Icon, Tooltip } from "~/components/Shared";

type ShareButtonContainerProps = { onClick: () => void };
const ShareButtonContainer = forwardRef<HTMLElement, ShareButtonContainerProps>((props, ref) => {
  return (
    <Tooltip id="ShareButtonContainer" content="Udostępnij">
      <Icon onClick={props.onClick}>
        <ShareIcon ref={ref as Ref<SVGSVGElement>} height={24} width={24} />
      </Icon>
    </Tooltip>
  );
});

ShareButtonContainer.displayName = "ShareButtonContainer";
export default ShareButtonContainer;
