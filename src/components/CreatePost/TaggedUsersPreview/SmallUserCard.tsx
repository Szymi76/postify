import { type User } from "@prisma/client";
import React from "react";
import { Avatar } from "~/components/Global";

type SmallUserCardProps = { user: User };
const SmallUserCard = (props: SmallUserCardProps) => {
  const { user } = props;
  return (
    <div className="flex w-min items-center gap-2 whitespace-nowrap rounded-lg bg-slate-300 p-1">
      <Avatar src={user?.image} placeholderText={user.name} size="small" />
      <p className="max-w-[100px] overflow-hidden text-ellipsis text-sm font-medium text-gray-600">
        {user.name}
      </p>
    </div>
  );
};

export default SmallUserCard;
