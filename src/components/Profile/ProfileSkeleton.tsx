import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col gap-5 rounded-md bg-white p-3">
      {/* HEADER */}
      <div className="relative mx-auto h-40 w-full rounded-md bg-gray-200">
        <div className="placeholder avatar absolute -bottom-8 left-8">
          <div className="w-20 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-5 flex flex-col gap-1">
        <div className="h-4 w-2/6 rounded-md bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
      </div>

      {/* IMAGE */}
      <div>
        <div className="h-8 w-2/6 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
