import { UploadClient } from "@uploadcare/upload-client";
import { env } from "~/env.mjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

const uploadClient = new UploadClient({ publicKey: env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY });

export const otherRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(z.object({ file: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const { cdnUrl } = await uploadClient.uploadFile(input.file);
      return cdnUrl;
    }),
});
