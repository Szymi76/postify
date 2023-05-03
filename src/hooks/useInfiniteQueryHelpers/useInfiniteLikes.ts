import { api } from "~/utils/api";

type InfiniteLikesOptions = { limit?: number };
export const useInfiniteLikes = (postId: string | null, options?: InfiniteLikesOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.post.getInfinitePostLikes.useInfiniteQuery(
    { limit, postId },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const likes = data?.pages.map(page => page.items).flat() ?? [];

  return { likes, ...infiniteData };
};
