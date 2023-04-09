export const PAGES = {
  HOME: "/",
  SINGIN: "/auth/signin",
  POST: (postId: string) => `${location.origin}/post/${postId}`,
  PROFILE: (userId: string) => `${location.origin}/profile/${userId}`,
};

export const HEADER_HEIGHT = 56;
