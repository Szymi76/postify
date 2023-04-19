import { Ref, forwardRef } from "react";
import ActionButtonWrapper from "./ActionButtonWrapper";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";

type ShareButtonContainerProps = { onClick: () => void };
const ShareButtonContainer = forwardRef<HTMLElement, ShareButtonContainerProps>((props, ref) => {
  return (
    <ActionButtonWrapper tooltipText="Udostępnij">
      <ShareIcon ref={ref as Ref<SVGSVGElement>} className="h-6" onClick={props.onClick} />
    </ActionButtonWrapper>
  );
});

ShareButtonContainer.displayName = "ShareButtonContainer";
export default ShareButtonContainer;
