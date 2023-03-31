import { Friendship, User } from "@prisma/client";
import { z } from "zod";
import { noti } from "../../../utils/other";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

const actionEnum = z.enum(["accept", "reject"]);

export const friendshipRouter = createTRPCRouter({
  // wysyłanie zaproszenia do znajomych
  send: protectedProcedure
    .input(z.object({ receiverId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session.user;

      // sprawdzanie czy zaproszenie nie jest wysyłane do samego siebie
      if (currentUser.id == input.receiverId)
        throw new Error("You can't send friend request to yourself");

      const alreadyExistingFriendship = await ctx.prisma.friendship.findFirst({
        where: {
          OR: [
            { senderId: currentUser.id, receiverId: input.receiverId },
            { senderId: input.receiverId, receiverId: currentUser.id },
          ],
        },
      });

      // sprawdzanie czy znajomość nie istnieje
      if (alreadyExistingFriendship) throw new Error("The friendship already exists");

      // tworzenie znajomości
      const friendship = await ctx.prisma.friendship.create({
        data: {
          status: "pending",
          sender: { connect: { id: currentUser.id } },
          receiver: { connect: { id: input.receiverId } },
        },
      });

      // aktualizacja znajomości użytkownika, który wysłał zaproszenie
      await ctx.prisma.user.update({
        where: { id: currentUser.id },
        data: { senderFirendships: { connect: { id: friendship.id } } },
      });

      // aktualizacja użytkownika, który odbiera zaproszenie
      await ctx.prisma.user.update({
        where: { id: input.receiverId },
        data: { receiverFriendships: { connect: { id: friendship.id } } },
      });

      // dodawanie powiadomienia do użytkownika do którego wysyłamy zaproszenie
      await ctx.prisma.notification.create({
        data: {
          user: { connect: { id: input.receiverId } },
          type: noti.reveiveFriendRequest.type,
          text: noti.reveiveFriendRequest.text(currentUser.name ?? "kogoś"),
        },
      });

      return friendship;
    }),

  // akceptowanie zaproszenia do znajomych
  response: protectedProcedure
    .input(z.object({ friendshipId: z.string(), action: actionEnum }))
    .mutation(async ({ ctx, input }) => {
      // szukanie znajomości o podanym id
      const friendship = await ctx.prisma.friendship.findUnique({
        where: { id: input.friendshipId },
      });

      // sprawdzanie czy znajomość istnieje
      if (!friendship) throw new Error("No friendship with provided id");

      // sprawdzanie czy znajomość czeka na akceptacje
      if (friendship.status != "pending") throw new Error("Friendship is already accepted");

      // aktualizowanie statusu znajomości jako zaakceptowana
      if (input.action == "accept") {
        await ctx.prisma.friendship.update({
          data: { status: "accepted", acceptedAt: new Date().toISOString() },
          where: { id: input.friendshipId },
        });

        // dodawanie powiadomienia o zaakceptowanym zaproszeniu
        await ctx.prisma.notification.create({
          data: {
            user: { connect: { id: friendship.senderId } },
            type: noti.acceptFriendRequest.type,
            text: noti.acceptFriendRequest.text(ctx.session.user.name ?? "Ktoś"),
          },
        });
      }
      // aktualizowanie statusu znajomości jako odrzucona
      else {
        await ctx.prisma.friendship.delete({
          where: { id: input.friendshipId },
        });

        // dodawanie powiadomienia o odrzuconym zaproszeniu
        await ctx.prisma.notification.create({
          data: {
            userId: friendship.senderId,
            type: noti.rejectFriendRequest.type,
            text: noti.rejectFriendRequest.text(ctx.session.user.name ?? "Ktoś"),
          },
        });
      }
    }),

  // usuwanie użytkownika ze znajomych
  remove: protectedProcedure
    .input(z.object({ friendshipId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // sprawdzanie czy znajomość istnieje
      const friendship = await ctx.prisma.friendship.findUnique({
        where: { id: input.friendshipId },
      });
      if (!friendship) throw new Error("You can't delete not exsisting friendship");

      const usersIds = [friendship.senderId, friendship.receiverId];
      const otherUserId = usersIds.filter((id) => id != ctx.session.user.id)[0];
      if (!otherUserId)
        throw new Error("Something went wrong when getting other user in friendship");

      // dodanie powiadomienia o usunięciu ze znajomych
      await ctx.prisma.notification.create({
        data: {
          user: { connect: { id: otherUserId } },
          type: noti.removeFriend.type,
          text: noti.removeFriend.text(ctx.session.user.name ?? "Ktoś"),
        },
      });

      // usunięcie znajomości
      await ctx.prisma.friendship.delete({
        where: { id: input.friendshipId },
      });
    }),

  // lista znajomości
  list: protectedProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input.userId) input.userId = ctx.session.user.id;

      const friendships = await ctx.prisma.friendship.findMany({
        include: { sender: true, receiver: true },
        where: { OR: [{ senderId: input.userId }, { receiverId: input.userId }] },
      });

      return friendships as (Friendship & {
        sender: User;
        receiver: User;
      })[];
    }),
});
