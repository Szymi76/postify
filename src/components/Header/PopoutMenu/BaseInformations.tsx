import { User } from "@prisma/client";
import React from "react";
import Avatar from "~/components/Global/Avatar";

type BaseInformationsProps = { user: Partial<User> };
const BaseInformations = (props: BaseInformationsProps) => {
  const { user } = props;

  return (
    <div className="flex gap-4 border-b border-slate-200 p-4">
      <Avatar src={user.image} text={user.name} />
      <div className="flex flex-col overflow-hidden whitespace-nowrap">
        <h3
          className="overflow-hidden text-ellipsis text-xl font-medium text-black"
          title={user.name ?? undefined}
        >
          {user.name}
        </h3>
        <p
          className="overflow-hidden text-ellipsis text-sm text-gray-500"
          title={user.email ?? undefined}
        >
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default BaseInformations;
