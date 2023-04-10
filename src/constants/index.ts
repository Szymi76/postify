export const PAGES = {
  HOME: "/",
  SINGIN: "/auth/signin",
  POST: (postId: string) => `${location.origin}/post/${postId}`,
  PROFILE: (userId: string) => `${location.origin}/profile/${userId}`,
};

export const HEADER_HEIGHT = 56;
export const PAGE_PADDING_TOP_CLASS_NAME_WITH_HEADER = "pt-[56px]";