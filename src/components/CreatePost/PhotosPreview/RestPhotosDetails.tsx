import React from "react";

type RestPhotosDetailsProps = { text: string; tooltipText: string; icon: React.ReactNode };
const RestPhotosDetails = (props: RestPhotosDetailsProps) => {
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-slate-400 p-2 text-lg text-gray-100">
      <div className="flex">{props.text}</div>
      <div className="tooltip" data-tip={props.tooltipText}>
        {props.icon}
      </div>
    </div>
  );
};

export default RestPhotosDetails;
