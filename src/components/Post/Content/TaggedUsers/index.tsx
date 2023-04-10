import { User } from "@prisma/client";
import React from "react";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import SingleTaggedUser from "./SingleTaggedUser";

type TaggedUsersProps = { users: User[] };
const TaggedUsers = (props: TaggedUsersProps) => {
  return (
    <div className="flex items-start gap-1">
      <UserGroupIcon className="h-7" />
      <h4 className="font-semibold">Oznaczeni</h4>
      <div className="ml-2 flex flex-wrap items-end gap-1">
        {props.users.map((user, index) => (
          <SingleTaggedUser
            key={user.id}
            user={user}
            isLastInList={index == props.users.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TaggedUsers;
