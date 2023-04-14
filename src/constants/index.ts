export const PAGES = {
  HOME: "/",
  SINGIN: "/auth/signin",
  POST: (postId: string) => `${location.origin}/post/${postId}`,
  PROFILE: (userId: string) => `${location.origin}/profile/${userId}`,
  SETTINGS: {
    INDEX: "/settings",
    ACCOUNT: "/settings/account",
    NOTIFICATIONS: "/settings/notifications",
    SECURITY: "/settings/security",
  },
  SETTINGS_NOTIFICATIONS: "/settings/notifications",
};

// LAYOUT
export const HEADER_HEIGHT = 56;
export const PAGE_PADDING_TOP_CLASS_NAME_WITH_HEADER = "pt-[56px]";
export const SETTINGS_SIDEBAR_WIDTH_CLASS = "w-[350px]";

// INPUTS
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 16;
