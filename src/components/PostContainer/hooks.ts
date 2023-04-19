import { api } from "~/utils/api";

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
