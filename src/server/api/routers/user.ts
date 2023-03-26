import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const userRouter = createTRPCRouter({
  // aktualizacja nazwy, zdjęcia profilowego i zdjęcia w tle
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
      if (!image) image = null;

      // sprawdzanie czy zdjęcie w tle jest okej
      let backgroundImage = input.backgroundImage
        ? input.backgroundImage
        : ctx.session.user.backgroundImage;
      if (!backgroundImage) backgroundImage = null;

      // aktualizowanie danych
      await ctx.prisma.user.update({
        data: { name, image, backgroundImage },
        where: { id: ctx.session.user.id },
      });
    }),

  // usuwanie uzytkownika
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.delete({ where: { id: ctx.session.user.id } });
  }),
});