import { User } from "@prisma/client";
import React from "react";
import { UserCard } from "~/components/Global";
import Avatar from "~/components/Global/Avatar";

type BaseInformationsProps = { user: Partial<User> };
const BaseInformations = (props: BaseInformationsProps) => {
  const { user } = props;

  return (
    <div className="flex gap-4 border-b border-slate-200 p-4 text-black">
      <UserCard avatarUrl={user.image} name={user.name} secondaryText={user.email} />
    </div>
  );
};

export default BaseInformations;
