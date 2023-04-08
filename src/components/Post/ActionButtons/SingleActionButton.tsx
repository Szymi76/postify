import React from "react";

type SingleActionButtonProps = {
  children: React.ReactNode;
  tooltipText?: string;
  onClick?: () => void;
};
const SingleActionButton = (props: SingleActionButtonProps) => {
  return (
    <div className="tooltip" data-tip={props.tooltipText}>
      <div className="icon" onClick={props.onClick}>
        {props.children}
      </div>
    </div>
  );
};

export default SingleActionButton;
