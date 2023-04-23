import React from "react";

type SingleActionButtonProps = {
  children: React.ReactNode;
  tooltipText?: string;
  tooltipAnchor?: "left" | "right" | "top";
  onClick?: () => void;
};
const SingleActionButton = (props: SingleActionButtonProps) => {
  let className = "tooltip-top";
  if (props.tooltipAnchor == "right") className = "tooltip-right md:tooltip-top";
  if (props.tooltipAnchor == "left") className = "tooltip-left md:tooltip-top";

  return (
    <div className={`tooltip ${className}`} data-tip={props.tooltipText}>
      <div className="icon" onClick={props.onClick}>
        {props.children}
      </div>
    </div>
  );
};

export default SingleActionButton;
