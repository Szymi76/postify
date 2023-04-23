import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
/**
 * nieskończeni użytkownicy
 */
type InfiniteUsersOptions = { query?: string; ids?: string[]; limit?: number };
export const useInfiniteUsers = (options?: InfiniteUsersOptions) => {
  const query = options?.query;
  const ids = options?.ids;
  const limit = options?.limit;

  const { data, ...infiniteData } = api.user.getInfiniteUsers.useInfiniteQuery(
    { query, ids, limit: limit ?? 3 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const users = data?.pages.map((page) => page.items).flat() ?? [];

  return { users, ...infiniteData };
};

/**
 * nieskończone komentarze
 */
type InfiniteCommentsOptions = { limit?: number };
export const useInfiniteComments = (postId: string, options?: InfiniteCommentsOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.comment.getInfiniteComments.useInfiniteQuery(
    { limit, postId },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const comments = data?.pages.map((page) => page.items).flat() ?? [];

  return { comments, ...infiniteData };
};

/**
 * nieskończone polubienia
 */
type InfiniteLikesOptions = { limit?: number };
export const useInfiniteLikes = (postId: string | null, options?: InfiniteLikesOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.post.getInfinitePostLikes.useInfiniteQuery(
    { limit, postId },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const likes = data?.pages.map((page) => page.items).flat() ?? [];

  return { likes, ...infiniteData };
};

/**
 * nieskońzceni znajomi
 */

type InfiniteFriendshipsOptions = { limit?: number; userId?: string };
export const useInfiniteFriends = (options?: InfiniteFriendshipsOptions) => {
  const currentUser = useSession().data?.user;
  const limit = options?.limit ?? 5;
  const userId = options?.userId ?? currentUser?.id;

  const { data, ...infiniteData } = api.friendship.getInfiniteFriends.useInfiniteQuery(
    { limit, userId: options?.userId },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const friendships = data?.pages.map((page) => page.items).flat() ?? [];

  const friends = friendships.map((friendship) => {
    return friendship.receiverId == userId ? friendship.sender : friendship.receiver;
  });

  return { friendships, friends, ...infiniteData };
};
