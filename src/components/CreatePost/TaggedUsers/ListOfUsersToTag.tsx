import { User } from "@prisma/client";
import Avatar from "~/components/Actions/Avatar";

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
              <Avatar src={user.image} text={user.name} />
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
