import { type User } from "@prisma/client";
import { useCreatePostContext } from "../../CreatePostContext";
import { UserCard } from "~/components/Global";

export type ListOfUsersToTagContainerProps = { users?: Partial<User>[] };
const ListOfUsersToTagContainer = (props: ListOfUsersToTagContainerProps) => {
  const { values, updateValues } = useCreatePostContext();

  if (!props.users) return <></>;

  const isUserTagged = (userId: string) => values.taggedUsersIds.includes(userId);

  const toggleUserTag = (userId: string) => {
    const newTaggedUsersIds = isUserTagged(userId)
      ? values.taggedUsersIds.filter((id) => id != userId)
      : [...values.taggedUsersIds, userId];
    updateValues({ taggedUsersIds: newTaggedUsersIds });
  };

  return (
    <div className="mt-5 flex flex-col">
      {props.users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center justify-between border-b border-slate-300 p-2 last:border-b-0"
          >
            <UserCard name={user.name} avatarUrl={user.image} />
            <button className="btn-ghost btn" onClick={() => toggleUserTag(user.id!)}>
              {isUserTagged(user.id!) ? "Oznaczony" : "Nie oznaczony"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListOfUsersToTagContainer;
