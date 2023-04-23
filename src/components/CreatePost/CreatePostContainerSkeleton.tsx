import React from "react";
import { Avatar } from "../Global";

const CreatePostContainerSkeleton = () => {
  return (
    <div className="layout mx-auto w-[95%] max-w-3xl">
      <div className="flex justify-between gap-5">
        {/* AVATAR */}
        <Avatar />
        {/* TEXTFIELD */}
        <div className="h-16 flex-1 rounded-lg bg-slate-200"></div>
      </div>
      {/* BUTTONS */}
      <div className="mt-3 flex justify-end gap-5">
        <div className="h-5 w-[10%] rounded-md bg-slate-200"></div>
        <div className="h-5 w-[10%] rounded-md bg-slate-200"></div>
        <div className="h-5 w-[10%] rounded-md bg-slate-200"></div>
      </div>
    </div>
  );
};

export default CreatePostContainerSkeleton;