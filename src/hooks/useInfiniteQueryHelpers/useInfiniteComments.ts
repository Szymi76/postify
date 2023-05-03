import { api } from "~/utils/api";

type InfiniteCommentsOptions = { limit?: number };
export const useInfiniteComments = (postId: string, options?: InfiniteCommentsOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.comment.getInfiniteComments.useInfiniteQuery(
    { limit, postId },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const comments = data?.pages.map(page => page.items).flat() ?? [];

  return { comments, ...infiniteData };
};
