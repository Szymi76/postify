import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const communityRouter = createTRPCRouter({
  // TWORZENIE NOWEJ SPOŁECZNOŚCI
  add: protectedProcedure
    .input(z.object({ name: z.string().min(3).max(32), type: z.string().min(3).max(16) }))
    .mutation(async ({ ctx, input }) => {
      const community = await ctx.prisma.community.create({
        data: {
          name: input.name,
          type: input.type,
          creator: { connect: { id: ctx.session.user.id } },
          participants: { createMany: { data: { participantId: ctx.session.user.id } } },
        },
      });

      return community;
    }),

  // USUWANIE SPOŁECZNOŚCI
  delete: protectedProcedure
    .input(z.object({ communityId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const commuity = await ctx.prisma.community.findUnique({
        where: { id: input.communityId },
        include: { creator: true },
      });

      if (!commuity) throw new Error("Can't delete not existsing community");

      if (commuity.creator.id != ctx.session.user.id)
        throw new Error("You have no permission to delete this community");

      await ctx.prisma.community.delete({ where: { id: input.communityId } });
    }),

  // (DOŁĄCZANIE)/(OPUSZCZANIE) SPOŁECZNOŚCI
  toggleParticipation: protectedProcedure
    .input(z.object({ communityId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // społeczność na podstawie id
      const commuity = await ctx.prisma.community.findUnique({
        where: { id: input.communityId },
        include: { creator: true, participants: { include: { participant: true } } },
      });

      if (!commuity) throw new Error("Can't delete not existsing community");

      // sprawdzenie czy użytkownik który chce dołączyć lub opóścić chat nie jest niego autorem
      if (commuity.creatorId == ctx.session.user.id)
        throw new Error("You cant join or leave your community as creator");

      const currentUserAsParticipant = commuity.participants.find(
        (val) => val.participant.id == ctx.session.user.id
      );

      // usuwanie użytkownika jeśli w tym momecie jest uczestnikiem
      if (currentUserAsParticipant) {
        await ctx.prisma.participant.delete({ where: { id: currentUserAsParticipant.id } });
      }
      // dodawanie użytkownika do społeczności
      else {
        await ctx.prisma.participant.create({
          data: {
            participant: { connect: { id: ctx.session.user.id } },
            community: { connect: { id: input.communityId } },
          },
        });
      }
    }),

  // POBIERANIE ILOŚCI NIE ZOBACZONYCH POSTÓW W SPOŁECZNOŚCI
  getNotSeenPosts: protectedProcedure
    .input(z.object({ communityId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          communityId: input.communityId,
          seenBy: {
            none: {
              userId: ctx.session.user.id,
            },
          },
        },
      });

      return posts;
    }),

  // POBIERANIE WSZYSTKICH SPOŁECZNOŚCI UŻYTKOWNIKA
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const communities = await ctx.prisma.community.findMany({
      include: { participants: { include: { participant: true } } },
    });

    return communities;
  }),

  // POBIERANIE WSZYSTKICH SPOŁECZNOŚCI UŻYTKOWNIKA
  getAllThatUserIsIn: protectedProcedure.query(async ({ ctx }) => {
    const communities = await ctx.prisma.community.findMany({
      where: {
        participants: {
          some: { participantId: ctx.session.user.id },
        },
      },
      include: { participants: { include: { participant: true } } },
    });

    return communities;
  }),
});
