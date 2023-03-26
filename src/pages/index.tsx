// "use client";

import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { api } from "~/utils/api";

import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({ publicKey: "736e960af151c369236f" });

const Home: NextPage = () => {
  const [image, setImage] = useState<File | null>(null);

  const { data: users } = api.users.getAll.useQuery();

  const { mutate } = api.friendship.send.useMutation();

  const { data: session } = useSession();

  const handleUploadFile = async () => {
    if (!image) throw new Error("No files to upload!");

    const { cdnUrl } = await client.uploadFile(image);
    console.log("URL:", cdnUrl);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) throw new Error("No files!");

    const newImage = files[0]!;

    setImage(newImage);
  };

  return (
    <div>
      <button className="btn" onClick={() => void signIn()}>
        Zaloguj się
      </button>
      <button className="btn" onClick={() => void signOut()}>
        Wyloguj się
      </button>
      {session ? session.user.name : "BRAK SESSI"}
      {session && session.user.id}
      <input type="file" multiple={false} onChange={handleImageChange} />
      <button onClick={() => void handleUploadFile()}>Upload</button>
    </div>
  );
};

export default Home;
