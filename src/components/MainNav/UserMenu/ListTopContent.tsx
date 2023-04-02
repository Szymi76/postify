import { User } from "@prisma/client";
import React from "react";
import Avatar from "~/components/Actions/Avatar";

export type ListTopContentProps = { currentUser: Partial<User> };
export const ListTopContent = (props: ListTopContentProps) => {
  const { currentUser } = props;

  return (
    <>
      <Avatar src={currentUser.image} text={currentUser.name} />
      <div className="flex flex-col overflow-hidden whitespace-nowrap">
        <h3
          className="overflow-hidden text-ellipsis text-xl font-medium text-black"
          title={currentUser.name ?? undefined}
        >
          {currentUser.name}
        </h3>
        <p
          className="overflow-hidden text-ellipsis text-sm text-slate-300"
          title={currentUser.email ?? undefined}
        >
          {currentUser.email}
        </p>
      </div>
    </>
  );
};

export default ListTopContent;
