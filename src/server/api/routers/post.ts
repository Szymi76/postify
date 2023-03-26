import { z } from "zod";
import { noti, validUserName } from "~/utils/other";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const postRouter = createTRPCRouter({
  // DODAWANIE NOWEGO POSTU
  add: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1).max(120),
        images: z.string().array().max(4),
        taggedUsersIds: z.string().array().max(3),
        communityId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // tworzenie postu
      let post = await ctx.prisma.post.create({
        data: {
          text: input.text,
          images: input.images,
          author: { connect: { id: ctx.session.user.id } },
          taggedUsers: {
            createMany: {
              data: input.taggedUsersIds.map((id) => {
                return { taggedUserId: id };
              }),
            },
          },
        },
      });

      // dodawanie postu do społeczności jeśli została podana
      if (input.communityId) {
        post = await ctx.prisma.post.update({
          data: { community: { connect: { id: input.communityId } } },
          where: { id: post.id },
        });
      }

      const notificationsPromises = input.taggedUsersIds.map((id) => {
        return ctx.prisma.notification.create({
          data: {
            user: { connect: { id } },
            type: noti.someoneTaggedYou.type,
            text: noti.someoneTaggedYou.text(ctx.session.user.name ?? "Ktoś"),
          },
        });
      });

      await Promise.all(notificationsPromises);

      return post;
    }),

  // AKTUALIZOWANIE POSTU
  update: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        text: z.string().min(1).max(120).optional(),
        images: z.string().array().max(4).optional(),
        taggedUsersIds: z.string().array().max(3).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        select: { authorId: true },
      });

      // sprawdzanie czy post istnieje i czy uzytkownik jest autorem
      if (!post) throw new Error("Can't update not exsisting post");
      if (post.authorId != ctx.session.user.id)
        throw new Error("You are not allowed to update this post");

      // aktualizacja nazwy
      if (input.text) {
        await ctx.prisma.post.update({
          data: { text: input.text, updatedAt: new Date().toISOString() },
          where: { id: input.postId },
        });
      }

      // aktualizacja zdjęć
      if (input.images) {
        await ctx.prisma.post.update({
          data: { images: input.images, updatedAt: new Date().toISOString() },
          where: { id: input.postId },
        });
      }

      // aktualizacja oznaczonych użytkowników
      if (input.taggedUsersIds) {
        // usuwanie wszystkich oznaczonych użytkowników
        await ctx.prisma.taggedUser.deleteMany({
          where: { postId: input.postId },
        });

        // dodawanie nowych zaznaczonych użytkowników
        const createPromises = input.taggedUsersIds.map((id) => {
          return ctx.prisma.taggedUser.create({
            data: {
              post: { connect: { id: input.postId } },
              taggedUser: { connect: { id } },
            },
          });
        });

        await Promise.all(createPromises);

        // informacja o aktualizacji danych
        await ctx.prisma.post.update({
          data: { updatedAt: new Date().toISOString() },
          where: { id: input.postId },
        });
      }
    }),

  // POBIERANIE POSTU NA PODSTAWIE ID
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: {
          author: true,
          comments: { include: { author: true } },
          likes: { include: { user: true } },
          bookmarked: { include: { user: true } },
          seenBy: { include: { user: true } },
          taggedUsers: { include: { taggedUser: true } },
        },
      });

      return post;
    }),

  // USUWANIE POSTU NA PODSTAWIE ID
  delete: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        select: { authorId: true },
      });

      // sprawdzanie czy post istnieje i czy uzytkownik jest autorem
      if (!post) throw new Error("Can't delete not exsisting post");
      if (post.authorId != ctx.session.user.id)
        throw new Error("You are not allowed to delete this post");

      // usuwanie postu
      await ctx.prisma.post.delete({
        where: { id: input.postId },
      });
    }),

  // ZMIENIANIE POLUBIENIA POSTU NA PODSTAWIE ID W ZALEŻNOŚCI CZY UŻYTKOWNIK (NIE) POLUBIŁ POST
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // pobieranie postu z polubieniami
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: { likes: { include: { user: true } } },
      });

      // sprawdzanie czy post istnieje
      if (!post) throw new Error("Can't toggle like of post that doesn't exists");

      const currentUserLike = post.likes.find((like) => like.user.id == ctx.session.user.id);

      // usuwanie pulubienia jeśli użytkownik już polubł post
      if (currentUserLike) {
        await ctx.prisma.like.delete({
          where: { id: currentUserLike.id },
        });
      }

      // dodawanie polubienia
      else {
        await ctx.prisma.like.create({
          data: {
            user: { connect: { id: ctx.session.user.id } },
            post: { connect: { id: input.postId } },
          },
        });
      }
    }),

  // ZMIANIANIE ZAZNACZENIA POSTU NA PODSTAWIE ID W ZALEŻNOŚCI CZY UŻYTKOWNIK (NIE)ZAZNACZYŁ POST
  toggleBookmarked: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // pobieranie postu z polubieniami
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: { bookmarked: { include: { user: true } } },
      });

      // sprawdzanie czy post istnieje
      if (!post) throw new Error("Can't toggle like of post that doesn't exists");

      const currentUserBookmark = post.bookmarked.find(
        (bookmarked) => bookmarked.user.id == ctx.session.user.id
      );

      // usuwanie pulubienia jeśli użytkownik już polubł post
      if (currentUserBookmark) {
        await ctx.prisma.bookmarked.delete({
          where: { id: currentUserBookmark.id },
        });
      }

      // dodawanie polubienia
      else {
        await ctx.prisma.bookmarked.create({
          data: {
            user: { connect: { id: ctx.session.user.id } },
            post: { connect: { id: input.postId } },
          },
        });
      }
    }),

  // ZAZNACZANIE POSTU JAKO ZOBACZONY
  markAsSeen: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: { seenBy: { include: { user: true } } },
      });

      if (!post) throw new Error("Can't mark as seen post that doesn't exists");

      if (post.seenBy.some((seen) => seen.user.id == ctx.session.user.id)) {
        console.log(`Post with id ${input.postId} is already seen.`);
        return;
      }

      await ctx.prisma.seenBy.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          post: { connect: { id: input.postId } },
        },
      });
    }),
});
