import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";
import { type User } from "@prisma/client";

export const userRouter = createTRPCRouter({
  /**
   * Aktualizuje nazwę, opis, zdjęcie profilowe lub zdjęcie w tle
   * aktualnie zalogowanego użytkownika.
   */
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(16).nullable().optional(),
        description: z.string().max(80).nullable().optional(),
        image: z.string().url().nullable().optional(),
        backgroundImage: z.string().url().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // sprawdzanie czy nowe imie jest okej
      let name = input.name ? input.name : ctx.session.user.name;
      if (!name) name = null;

      // sprawdzanie czy opis uzytkownika jest okej
      let description = input.description ? input.description : ctx.session.user.description;
      if (!description) description = null;

      // sprawdzanie czy zdjęcie profilowe jest okej
      let image = input.image ? input.image : ctx.session.user.image;
      if (!image || input.image == null) image = null;

      console.log(input.backgroundImage);

      // sprawdzanie czy zdjęcie w tle jest okej
      let backgroundImage = input.backgroundImage
        ? input.backgroundImage
        : ctx.session.user.backgroundImage;
      if (!backgroundImage || input.backgroundImage == null) backgroundImage = null;

      // aktualizowanie danych
      await ctx.prisma.user.update({
        data: { name, description, image, backgroundImage },
        where: { id: ctx.session.user.id },
      });
    }),

  /**
   * Usuwanie aktualnie zalogowanego użytkownika.
   */
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.delete({ where: { id: ctx.session.user.id } });
  }),

  /**
   * Szukanie użytkowników na podstawie nazwy (małe i duże litery)
   * oraz opcjonalne usunięcie aktualnie zalogowanego użytkownika z
   * tablicy wyników.
   */
  find: protectedProcedure
    .input(z.object({ query: z.string(), omitMe: z.boolean().optional() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
      });

      return input.omitMe ? users.filter(user => user.id != ctx.session.user.id) : users;
    }),

  /**
   * Zwraca użytkowników na podstawie id podanych jako input
   */
  getByIds: publicProcedure
    .input(z.object({ ids: z.string().array() }))
    .query(async ({ ctx, input }) => {
      const usersPromises = input.ids.map(id => ctx.prisma.user.findUnique({ where: { id } }));
      const users = await Promise.all(usersPromises);
      const notNullUsers = users.filter(user => user != null) as User[];

      return notNullUsers;
    }),

  /**
   * Zwracanie użytkowników, którzy występują w tablicy id lub nazwa zawiera query (małe i duże litery).
   * Oba inputy są opcjonalne, route należy do kategorii (infinite), więc co każde użycie metody
   * 'fetchNextPage' z hooka useInfiniteQuery pobieranie są kolejni użytkownikcy, czyli tam gdzie
   * znajduję się aktualnie (kursor +1 ) + limit.
   */
  getInfiniteUsers: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        ids: z.string().array().optional(),
        query: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (typeof input.query == "string" && input.query.trim().length == 0) {
        return {
          items: [],
        };
      }

      const { cursor } = input;
      const items = await ctx.prisma.user.findMany({
        take: input.limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          ...(input.ids && { id: { in: input.ids } }),
          ...(input.query && { name: { contains: input.query, mode: "insensitive" } }),
        },
        cursor: cursor ? { id: cursor } : undefined,
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
