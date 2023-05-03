import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

type InfiniteFriendshipsOptions = { limit?: number; userId?: string };
export const useInfiniteFriends = (options?: InfiniteFriendshipsOptions) => {
  const currentUser = useSession().data?.user;
  const limit = options?.limit ?? 5;
  const userId = options?.userId ?? currentUser?.id;

  const { data, ...infiniteData } = api.friendship.getInfiniteFriends.useInfiniteQuery(
    { limit, userId: options?.userId },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const friendships = data?.pages.map(page => page.items).flat() ?? [];

  const friends = friendships.map(friendship => {
    return friendship.receiverId == userId ? friendship.sender : friendship.receiver;
  });

  return { friendships, friends, ...infiniteData };
};
