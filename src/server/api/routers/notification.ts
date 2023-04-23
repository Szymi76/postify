import { Friendship, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const notificationRouter = createTRPCRouter({
  /**
   * Zwraca wszystkie nie zobaczone powiadomienia aktualnie zalogowanego użytkownika.
   */
  notSeen: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        where: { userId: ctx.session.user.id, seenAt: null },
        include: { creator: true },
        ...(input.limit && { take: input.limit }),
      });

      return notifications;
    }),

  /**
   * Zwraca wszystkie powiadomienia aktualnie zalogowanego użytkownika (widzianie i nie widziane).
   */
  all: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
    });

    return notifications;
  }),

  /**
   * Ustawia wszystkie powiadomienia (na podstawie id podanych w input) jako widziane.
   */
  markAsSeen: protectedProcedure
    .input(z.object({ notificationsIds: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      const updatePromises = input.notificationsIds.map((id) =>
        ctx.prisma.notification.update({
          data: { seenAt: new Date().toISOString() },
          where: { id },
        })
      );

      await Promise.all(updatePromises);
    }),

  getInfiniteNotifications: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor } = input;
      const items = await ctx.prisma.notification.findMany({
        take: input.limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where: { userId: ctx.session.user.id, seenAt: null },
        include: { creator: true },
        orderBy: { createdAt: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
