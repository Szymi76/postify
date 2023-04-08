import Avatar from "~/components/Global/Avatar";
import { api } from "~/utils/api";

export type TaggedUsersPreviewProps = { taggedUsersIds: string[] };
export const TaggedUsersPreview = (props: TaggedUsersPreviewProps) => {
  const { data: users } = api.user.getByIds.useQuery({ ids: props.taggedUsersIds });

  if (!users || users.length == 0) return <></>;

  return (
    <div className="flex justify-end">
      <div className="max-w-xl flex-wrap gap-1 rounded-md  bg-slate-200 p-2">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex w-min items-center gap-2 whitespace-nowrap rounded-lg bg-slate-300 p-1"
            >
              <Avatar src={user?.image} text={user.name} size="8" />
              <p className="text-sm font-medium text-gray-600">{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
