import React from "react";
import { Avatar } from "../Global";

const PostSkeleton = () => {
  return (
    <div className="flex w-[750px] max-w-[95%] animate-pulse flex-col gap-5 rounded-md bg-white p-3">
      {/* HEADER */}
      <div className="flex gap-2">
        <div className="placeholder avatar">
          <div className="w-12 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex w-full flex-col justify-center gap-1">
          <div className="h-5 w-1/5 rounded-md bg-gray-200"></div>
          <div className="h-3 w-1/6 rounded-md bg-gray-200"></div>
        </div>
      </div>

      {/* TEXT */}
      <div className="flex flex-col gap-1">
        <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
        <div className="h-4 w-2/6 rounded-md bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded-md bg-gray-200"></div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center">
        <div className="h-32 w-full rounded-md bg-gray-200"></div>
      </div>

      {/* BUTTON ACTIONS */}
      <div className="flex justify-between">
        <div className="h-6 w-1/6 rounded-md bg-gray-200"></div>
        <div className="h-6 w-1/12 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
