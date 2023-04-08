import { Friendship, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";
import { TRPCError } from "@trpc/server";

export const commentRouter = createTRPCRouter({
  // DODAWANIE KOMENTARZA DO POSTU
  add: protectedProcedure
    .input(z.object({ postId: z.string(), text: z.string().min(1).max(80) }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
      });

      if (!post) throw new Error("Can't add comment to post that doesn't exsists");

      const comment = await ctx.prisma.comment.create({
        data: {
          text: input.text,
          post: { connect: { id: input.postId } },
          author: { connect: { id: ctx.session.user.id } },
        },
      });

      return comment;
    }),

  // USUWANIE KOMENTARZA PO ID
  delete: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        include: { author: true },
      });
      if (!comment)
        throw new TRPCError({ message: "Can't delete not existing comment", code: "NOT_FOUND" });

      const isCurrentUserAuthor = comment.author.id == ctx.session.user.id;
      if (!isCurrentUserAuthor)
        throw new TRPCError({ message: "You are not author of that comment", code: "FORBIDDEN" });

      await ctx.prisma.comment.delete({ where: { id: input.commentId } });
    }),

  // POBIERANIE KOMENTZRZA PO ID
  getCommentWithId: protectedProcedure
    .input(z.object({ id: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (input.id == null) return null;
      const comment = await ctx.prisma.comment.findUnique({
        where: { id: input.id },
        include: { author: true },
      });
      return comment;
    }),

  getInfiniteComments: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor } = input;
      const items = await ctx.prisma.comment.findMany({
        take: input.limit + 1, // get an extra item at the end which we'll use as next cursor
        where: { postId: input.postId },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: { author: true },
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
