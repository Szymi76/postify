import { Ref, forwardRef } from "react";
import SingleActionButton from "../SingleActionButton";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";

type ShareButtonProps = { onClick: () => void };
const ShareButton = forwardRef<HTMLElement, ShareButtonProps>((props, ref) => {
  return (
    <SingleActionButton tooltipText="Udostępnij">
      <ShareIcon ref={ref as Ref<SVGSVGElement>} className="h-6" onClick={props.onClick} />
    </SingleActionButton>
  );
});

ShareButton.displayName = "ShareButton";
export default ShareButton;
