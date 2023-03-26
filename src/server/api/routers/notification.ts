import { Friendship, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const notificationRouter = createTRPCRouter({
  // wszystkie nie zobaczone powiadomienia aktualnie zalogowanego użytkownika
  notSeen: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id, SeenBy: null },
    });

    return notifications;
  }),

  // wszystkie powiadomienia aktualnie zalogowanego użytkownika
  all: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
    });

    return notifications;
  }),

  // zaznaczanie powiadomień jako widziane
  markAsSeen: protectedProcedure
    .input(z.object({ notificationsIds: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      const updatePromises = input.notificationsIds.map((id) =>
        ctx.prisma.notification.update({
          data: { SeenBy: new Date().toISOString() },
          where: { id },
        })
      );

      await Promise.all(updatePromises);
    }),
});
