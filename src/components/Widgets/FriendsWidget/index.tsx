import React from "react";
import { api } from "~/utils/api";
import { UserCard } from "~/components/Global";
import { timeFromNow } from "~/utils/other";
import Link from "next/link";
import { PAGES } from "~/constants";
import WidgetSkeleton from "../WidgetSkeleton";

const FriendsWidget = () => {
  const { data: friends, isLoading } = api.friendship.friendsList.useQuery({ limit: 5 });

  if (isLoading) return <WidgetSkeleton />;

  const zeroFriends = friends?.length == 0 && !isLoading;

  return (
    <div className="layout sticky top-0 hidden h-min w-[300px] 2xl:block">
      <h2 className="mb-2 text-xl font-semibold">Znajomi</h2>
      {zeroFriends && <p className="text-sm text-gray-500">Nie masz jeszcze żadnych znajomych</p>}
      <div className="flex flex-col">
        {friends?.map((friend) => {
          return (
            <Link key={friend.id} href={PAGES.PROFILE(friend.id)}>
              <UserCard
                avatarUrl={friend.image}
                name={friend.name}
                secondaryText={timeFromNow(friend.lastActive ?? new Date())}
                className="py-2"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsWidget;
