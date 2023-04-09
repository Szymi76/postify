import { createTRPCRouter } from "../../server/api/trpc";
import { friendshipRouter } from "../../server/api/routers/friendship";
import { notificationRouter } from "./routers/notification";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { communityRouter } from "./routers/community";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  friendship: friendshipRouter,
  notification: notificationRouter,
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  community: communityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
