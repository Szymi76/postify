import Link from "next/link";
import React from "react";
import { Avatar } from "~/components/Global";
import { PAGES } from "~/constants";
import { api } from "~/utils/api";

type ModalUsersListProps = { usersIds: string[] };
const ModalUsersList = (props: ModalUsersListProps) => {
  const { data, fetchNextPage } = api.user.getInfiniteUsersWithIds.useInfiniteQuery(
    { limit: 3, ids: props.usersIds },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const users = data?.pages.map((page) => page.items).flat() ?? [];

  // ŁADOWANIE NOWYCH UŻYTKOWNIKÓW PO PRZESKROLOWANIU NA SAM DÓŁ
  const handleScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const isScrollAtEnd =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (isScrollAtEnd) void fetchNextPage();
  };

  return (
    <ul onScroll={handleScroll} className="max-h-[190px] overflow-y-scroll">
      {users.map((user) => {
        return (
          <Link
            href={PAGES.PROFILE(user.id)}
            key={user.id}
            className="mx-1 flex items-center gap-2 border-b border-slate-200 p-3 hover:bg-gray-100"
          >
            <Avatar src={user.image} placeholderText={user.name} size={40} />
            <h4 className="text-md font-medium">{user.name}</h4>
          </Link>
        );
      })}
    </ul>
  );
};

export default ModalUsersList;
