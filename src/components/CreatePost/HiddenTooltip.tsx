import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import React from "react";

type HiddenTooltipProps = { text: string; show: boolean };
const HiddenTooltip = (props: HiddenTooltipProps) => {
  if (!props.show) return <></>;

  return (
    <div className="tooltip tooltip-left" data-tip={props.text}>
      <QuestionMarkCircleIcon className="h-5 text-gray-500" />
    </div>
  );
};

export default HiddenTooltip;
