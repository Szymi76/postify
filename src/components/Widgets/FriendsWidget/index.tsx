import React from "react";
import { api } from "~/utils/api";
import { UserCard } from "~/components/Global";
import { timeFromNow } from "~/utils/other";
import Link from "next/link";
import { PAGES } from "~/constants";
import WidgetSkeleton from "../WidgetSkeleton";
import { useSession } from "next-auth/react";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { useGlobalModals } from "~/store/useGlobalModals";

const FriendsWidget = () => {
  const { setId } = useGlobalModals((state) => state.friendsModal);
  const currentUser = useSession().data?.user;
  const { data: friends, isLoading } = api.friendship.friendsList.useQuery({ limit: 5 });

  const open = () => setId(currentUser!.id);

  if (!currentUser) return <></>;
  if (isLoading) return <WidgetSkeleton />;

  const zeroFriends = friends?.length == 0 && !isLoading;

  return (
    <div className="layout sticky top-0 hidden h-min w-[300px] 2xl:block">
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl font-semibold">Znajomi</h2>
        <div className="tooltip" data-tip="Pokaż wszystkich znajomych">
          <EllipsisHorizontalIcon className="icon h-6" onClick={open} />
        </div>
      </div>
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
