import { User } from "@prisma/client";
import { UIEvent } from "react";
import Avatar from "~/components/Global/Avatar";

export type ListOfUsersToTagProps = {
  users?: Partial<User>[];
  taggedUsersIds: string[];
  onToggleUser: (id: string) => void;
};
export const ListOfUsersToTag = (props: ListOfUsersToTagProps) => {
  if (!props.users) return <></>;

  return (
    <div className="mt-5 flex flex-col">
      {props.users.map((user) => {
        const isUserTagged = props.taggedUsersIds.includes(user.id!);

        return (
          <div
            key={user.id}
            className="flex items-center justify-between border-b border-slate-300 p-2 last:border-b-0"
          >
            <div className="flex gap-3">
              <Avatar src={user.image} placeholderText={user.name} size={42} />
              <h3 className="font-medium">{user.name}</h3>
            </div>
            <button className="btn-ghost btn" onClick={() => props.onToggleUser(user.id!)}>
              {isUserTagged ? "Oznaczony" : "Nie oznaczony"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
