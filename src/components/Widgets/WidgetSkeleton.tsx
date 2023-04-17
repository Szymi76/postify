import React from "react";

const WidgetSkeleton = () => {
  return (
    <div className="flex h-min w-[300px] animate-pulse flex-col gap-2 rounded-md bg-white p-3">
      <div className="mb-3 h-8 w-3/6 rounded-md bg-gray-300"></div>

      {/* CARD 1 */}
      <div className="flex items-center gap-2">
        <div className="placeholder avatar h-14 w-14">
          <div className="rounded-full bg-gray-300"></div>
        </div>
        <div className="h-12 w-4/6 rounded-md bg-gray-200"></div>
      </div>

      {/* CARD 2 */}
      <div className="flex items-center gap-2">
        <div className="placeholder avatar h-14 w-14">
          <div className="rounded-full bg-gray-300"></div>
        </div>
        <div className="h-12 w-4/6 rounded-md bg-gray-200"></div>
      </div>

      {/* CARD 3 */}
      <div className="flex items-center gap-2">
        <div className="placeholder avatar h-14 w-14">
          <div className="rounded-full bg-gray-300"></div>
        </div>
        <div className="h-12 w-4/6 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export default WidgetSkeleton;
