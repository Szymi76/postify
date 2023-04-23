import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import React from "react";

type QuestionMarkAsTooltipProps = { text: string; className?: string; iconClassName?: string };
export const QuestionMarkAsTooltip = (props: QuestionMarkAsTooltipProps) => {
  return (
    <div className={`tooltip ${props.className ?? ""}`} data-tip={props.text}>
      <QuestionMarkCircleIcon className={`h-5 text-gray-500 ${props.iconClassName ?? ""}`} />
    </div>
  );
};

export default QuestionMarkAsTooltip;
