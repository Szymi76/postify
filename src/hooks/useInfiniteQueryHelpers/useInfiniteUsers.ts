import { api } from "~/utils/api";

type InfiniteUsersOptions = { query?: string; ids?: string[]; limit?: number };
export const useInfiniteUsers = (options?: InfiniteUsersOptions) => {
  const query = options?.query;
  const ids = options?.ids;
  const limit = options?.limit;

  const { data, ...infiniteData } = api.user.getInfiniteUsers.useInfiniteQuery(
    { query, ids, limit: limit ?? 3 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const users = data?.pages.map(page => page.items).flat() ?? [];

  return { users, ...infiniteData };
};
