import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { api } from "~/utils/api";
import { reloadSession, uploadFile } from "~/utils/other";

type Data = {
  name: string | null;
  image: string | File | null;
  backgroundImage: string | File | null;
};

const UserPage = () => {
  const { mutateAsync: updateUser } = api.user.update.useMutation();
  const { mutateAsync: deleteUser } = api.user.delete.useMutation();

  const { data: session, status } = useSession();

  const [data, setData] = useState<Data>({ name: "", image: null, backgroundImage: null });

  useEffect(() => {
    if (!session || !session.user) return;

    setData({
      name: session.user.name ?? null,
      image: session.user.image ?? null,
      backgroundImage: session.user.backgroundImage,
    });
  }, [session]);

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) return e.target.files[0]!;
    return null;
  };

  const handleUpdate = async () => {
    const name = data.name;
    let image = data.image;
    if (image instanceof File) image = await uploadFile(image);
    let backgroundImage = data.backgroundImage;
    if (backgroundImage instanceof File) backgroundImage = await uploadFile(backgroundImage);

    await updateUser({ name, image, backgroundImage });
    reloadSession();
  };

  const handleDelete = async () => {
    await deleteUser();
    reloadSession();
  };

  return (
    <main>
      <div className="m-2 flex flex-col gap-3 border border-red-500 p-2">
        NAME:{" "}
        <input
          className="input-bordered input-primary input w-full max-w-xs"
          type="text"
          value={data.name ?? undefined}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        IMAGE:{" "}
        <input
          className="file-input-bordered file-input w-full max-w-xs"
          type="file"
          multiple={false}
          onChange={(e) => setData({ ...data, image: getFile(e) })}
        />
        BAKCGROUND IMAGE:{" "}
        <input
          className="file-input-bordered file-input w-full max-w-xs"
          type="file"
          multiple={false}
          onChange={(e) => setData({ ...data, backgroundImage: getFile(e) })}
        />
        <button className="btn-outline btn-primary btn w-min" onClick={() => void handleUpdate()}>
          ZAPISZ
        </button>
      </div>
      <div>
        {session && session.user && (
          <>
            <p>NAME: {session.user.name}</p>
            <p>IMAGE: {session.user.image}</p>
            <p>BG IMAGE: {session.user.backgroundImage}</p>
            <button className="btn-error btn" onClick={reloadSession}>
              REFRESH SESSION
            </button>
            <img src={session.user.image ?? undefined} alt="some image" />
          </>
        )}
      </div>
      <button className="btn-outline btn-error btn" onClick={() => void handleDelete()}>
        USUŃ KONTO
      </button>
    </main>
  );
};

UserPage.requireAuth = true;

export default UserPage;
