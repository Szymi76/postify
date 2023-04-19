import { z } from "zod";
import { noti, validUserName } from "~/utils/other";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const postRouter = createTRPCRouter({
  /**
   * Dodawanie nowego posta
   */
  add: protectedProcedure
    .input(
      z.object({
        text: z.string().max(120),
        images: z.string().array(),
        taggedUsersIds: z.string().array(),
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
            creator: { connect: { id: ctx.session.user.id } },
          },
        });
      });

      await Promise.all(notificationsPromises);

      return post;
    }),

  /**
   * Aktualizowanie wybranych danych postu na podstawie id.
   * Tylko autor ma prawo do edytowania!
   */
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

  /**
   * Wybieranie posta na podstawie podanego id lub `null` w przypadku
   * nie znalezienia.
   */
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
        include: {
          author: true,
          comments: { include: { author: true }, take: 3 },
          likes: { include: { user: true }, take: 3 },
          taggedUsers: { include: { taggedUser: true } },
        },
      });

      return post;
    }),

  /**
   * Usuwanie posta na podstawie id.
   * Tylko autor ma prawo do usunięcia postu!
   */
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

  /**
   * Zmienianie polubienia postu przez aktualnie zalogowanego użytkownika na podstawie id,
   * czyli, jeśli użytkownik ma aktualnie polubiony post to ten zostanie ustawiony jako NIE polubiony
   * i na odwrót.
   */
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

  /**
   * Zmienianie zaznaczenia postu przez aktualnie zalogowanego użytkownika na podstawie id,
   * czyli, jeśli użytkownik ma aktualnie zaznaczony post to ten zostanie ustawiony jako NIE zaznaczony
   * i na odwrót.
   */
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

  /**
   * Zaznaczanie postu jako widziany przez aktualnie zalogowanego użytkownika na podstawie id.
   */
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

  /**
   * Sprawdzanie czy post na podstawie id jest zaznaczony przez aktualnie zalogowanego użytkownika.
   * Zwraca zaznaczenie w postaci `Bookmarked`, jeśli post jest zaznaczony w przeciwnym przypadku zwraca `null`.
   */
  isPostBookmarkedByCurrentUser: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const bookmark = await ctx.prisma.bookmarked.findFirst({
        where: { postId: input.postId, userId: ctx.session.user.id },
      });
      return bookmark;
    }),

  /**
   * Sprawdzanie czy post na podstawie id jest polubiany przez aktualnie zalogowanego użytkownika.
   * Zwraca polubienie w postaci `Like`, jeśli post jest polubiony w przeciwnym przypadku zwraca `null`.
   */
  isPostLikedByCurrentUser: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const like = await ctx.prisma.like.findFirst({
        where: { postId: input.postId, userId: ctx.session.user.id },
      });
      return like;
    }),

  /**
   * Zwraca id najnowszych postów z bazy danych. Wykorzystuje metode 'infiniteQuery'
   * (wytłumaczone w przypadku 'getInfiniteUsers' w roucie 'user') .
   */
  getInfiniteLatestsPostsIds: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ ctx, input }) => {
      // const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.post.findMany({
        take: input.limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        select: { id: true },
        orderBy: {
          createdAt: "desc",
        },
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
