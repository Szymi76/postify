import { Friendship, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

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
});
