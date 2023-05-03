import { api } from "~/utils/api";

type InfiniteNotificationsOptions = { limit?: number };
export const useInfiniteNotifications = (options?: InfiniteNotificationsOptions) => {
  const limit = options?.limit ?? 5;

  const { data, ...infiniteData } = api.notification.getInfiniteNotifications.useInfiniteQuery(
    { limit },
    { getNextPageParam: lastPage => lastPage.nextCursor }
  );

  const notifications = data?.pages.map(page => page.items).flat() ?? [];

  return { notifications, ...infiniteData };
};
