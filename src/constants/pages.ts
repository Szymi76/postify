export const pages = {
  home: "/",
  signin: "/auth/signin",
  post: (postId: string) => `${location.origin}/post/${postId}`,
  profile: (userId: string) => `${location.origin}/profile/${userId}`,
  settings: {
    index: "/settings",
    account: "/settings/account",
    notifications: "/settings/notifications",
    security: "/settings/security",
  },
  completeTheConfigurations: "complete-the-configurations",
};
