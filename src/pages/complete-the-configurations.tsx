import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FileInput, LoadingButton } from "~/components/Global";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";

type Data = { name: string; image: File | string | null };
type NameError = { text: string; show: boolean };

function validUserName(name: string) {
  if (name.length < 3) return "Twoja nazwa jest za krótka.";
  if (name.length > 16) return "Twoja nazwa jest za długa.";
  return "";
}

const CompleteTheConfiguration = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { mutateAsync: updateUserData } = api.user.update.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<NameError>({ text: "", show: false });
  const [data, setData] = useState<Data>({ name: "", image: null });

  const currentUser = session?.user;

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      const isImageFile = data.image && typeof data.image != "string";
      const imageUrl = isImageFile ? await uploadFile(data.image as File) : null;
      await updateUserData({ name: data.name, image: imageUrl });
      location.reload();
      setIsLoading(false);
    } catch (err) {
      console.warn("Nie udało się dokończyć konfiguracji");
      setNameError({ text: validUserName(data.name), show: true });
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNameError({ ...nameError, text: validUserName(newName) });
    setData({ ...data, name: newName });
  };

  useEffect(() => {
    if (Boolean(currentUser?.name)) void router.push({ pathname: "/" });
    else if (status == "unauthenticated") void router.push({ pathname: "/auth/signin" });
    setData({ name: currentUser?.name ?? "", image: currentUser?.image ?? null });
  }, [currentUser, status]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100">
      <div className="layout relative">
        <h3 className="text-xl font-medium">Dokończ konfiguracje konta</h3>
        <p className="text-sm text-gray-500">Wypełnij wymagane pola, aby ukończyć logowanie.</p>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>
              <span className="label-text">Twoja widoczna nazwa *</span>
            </label>
            <input
              className="input-secondary input"
              type="text"
              minLength={3}
              value={data.name}
              onChange={handleNameChange}
            />
            <label>
              {nameError.show && (
                <span className="label-text-alt text-error">{nameError.text}</span>
              )}
            </label>
          </div>
          <label>
            <span className="label-text">Zdjęcie profilowe</span>
          </label>
          <FileInput
            file={data.image}
            onChange={(file) => file && setData({ ...data, image: file })}
            onClear={() => setData({ ...data, image: null })}
            avatarText={currentUser?.name ?? undefined}
          />
          <div className="mt-5 flex justify-end gap-1">
            <button className="btn-primary btn-sm btn" onClick={() => void signOut()}>
              Wyloguj się
            </button>
            <LoadingButton
              loading={isLoading}
              className="btn-primary btn-sm btn"
              onClick={() => void handleUpdateUser()}
            >
              Zapisz
            </LoadingButton>
          </div>
        </div>
        <div
          className="tooltip tooltip-right absolute bottom-4 left-4"
          data-tip="* - pole jest wymagane"
        >
          <QuestionMarkCircleIcon className="h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default CompleteTheConfiguration;
