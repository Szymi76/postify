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
});
