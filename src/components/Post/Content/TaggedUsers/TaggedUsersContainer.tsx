import React from "react";
import SingleTaggedUserContainer from "./SingleTaggedUserContainer";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import { User } from "@prisma/client";

type TaggedUsersContainerProps = { users: User[] };
const TaggedUsersContainer = (props: TaggedUsersContainerProps) => {
  if (props.users.length == 0) return <></>;

  return (
    <div className="flex items-start gap-1">
      <UserGroupIcon className="h-7" />
      <h4 className="font-semibold">Oznaczeni</h4>
      <div className="ml-2 flex flex-wrap items-end gap-1">
        {props.users.map((user, index) => (
          <SingleTaggedUserContainer
            key={user.id}
            user={user}
            isLastInList={index == props.users.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TaggedUsersContainer;
