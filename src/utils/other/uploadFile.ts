import { UploadClient } from "@uploadcare/upload-client";
import { env } from "~/env.mjs";

const uploadClient = new UploadClient({ publicKey: env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY });

export const uploadFile = async (file: File) => {
  const { cdnUrl } = await uploadClient.uploadFile(file);
  return cdnUrl;
};
