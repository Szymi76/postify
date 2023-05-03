import { api } from "~/utils/api";

type OrderBy = "likes-desc" | "created-at-desc";

type InfiniteFriendshipsOptions = { limit?: number; authorId?: string; orderBy?: OrderBy };
export const useInfiniteLatestsPostsIds = (options?: InfiniteFriendshipsOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.post.getInfiniteLatestsPostsIds.useInfiniteQuery(
    { limit, authorId: options?.authorId, orderBy: options?.orderBy },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const postsIds = data?.pages.map(page => page.items.map(item => item.id)).flat() ?? [];

  return { postsIds, ...infiniteData };
};
