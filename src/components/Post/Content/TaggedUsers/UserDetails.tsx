import { User } from "@prisma/client";
import React, { useState } from "react";
import { Avatar } from "~/components/Global";

type UserDetailsProps = { user: User };
const UserDetails = (props: UserDetailsProps) => {
  return (
    <div className="flex h-[75px] w-[250px] animate-scaling-in items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <Avatar src={props.user.image} text={props.user.name} />
      <div className="w-full">
        <h3 className="max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          {props.user.name}
        </h3>
        <p className="max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
          {props.user.description}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
