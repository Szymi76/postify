import { User } from "@prisma/client";
import React from "react";
import { UserCard } from "~/components/Global";

type UserDetailsProps = { user: User };
const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <div className="flex h-[75px] w-[250px] animate-scaling-in items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <UserCard name={user.name} avatarUrl={user.image} secondaryText={user.description} />
    </div>
  );
};

export default UserDetails;
