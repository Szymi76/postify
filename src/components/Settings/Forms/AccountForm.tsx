import React, { useEffect, useState } from "react";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, PAGES } from "~/constants";
import * as Settings from "~/components/Settings/Layouts";
import { useForm, SubmitHandler } from "react-hook-form";
import { FileInput2, LoadingButton } from "~/components/Global";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { reloadSession, uploadFile } from "~/utils/other";
import { useAlert } from "~/store";

type Inputs = {
  name: string;
  image?: FileList | string | null;
  backgroundImage?: FileList | string | null;
  description: string;
};

const AccountForm = () => {
  const currentUser = useSession().data!.user;
  const [isLoading, setIsLoading] = useState(false);
  const { pushAlert } = useAlert();
  const { mutateAsync: updateUserData } = api.user.update.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  //
  const getFileFromFrom = (name: "image" | "backgroundImage") => {
    const image = watch(name);
    if (typeof image == "string") return image;
    return image && image.length == 1 ? image[0] : undefined;
  };

  const validateImage = async (files?: FileList | string | null) => {
    if (files == null) return null;
    if (!files || files.length == 0) return undefined;
    if (typeof files == "string") return files;
    return (await uploadFile(files[0]!)) ?? undefined;
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);

      const { name, description } = data;
      const image = await validateImage(data.image);
      const backgroundImage = await validateImage(data.backgroundImage);

      await updateUserData({ name, image, backgroundImage, description });
      reloadSession();
      pushAlert({ text: "Dane zostały zaktualizowane", type: "info" });
    } catch (err) {
      console.warn("Nie udało się zaktualizować danych profilu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue("image", currentUser.image ?? null);
    setValue("backgroundImage", currentUser.backgroundImage ?? null);
  }, [currentUser]);

  return (
    <Settings.Form onSubmit={handleSubmit(onSubmit)}>
      <Settings.Title>Konto</Settings.Title>
      <Settings.SectionDescription
        title="Profil"
        description="Te informacje będą widoczne publicznie więc uważaj co wpisujesz."
      />
      {/* NAZWA */}
      <Settings.FormControl label="Widoczna nazwa" error={errors.name?.message}>
        <input
          {...register("name", {
            required: { value: true, message: "Twoja nazwa nie może być pusta" },
            minLength: { value: MIN_NAME_LENGTH, message: "Twoja nazwa jest za krótka" },
            maxLength: { value: MAX_NAME_LENGTH, message: "Twoja nazwa jest za długa" },
          })}
          defaultValue={currentUser.name!}
          type="text"
          className="input-secondary input"
        />
      </Settings.FormControl>
      <Settings.FormControl label="Zdjęcie profilowe" error={errors.image?.message}>
        <FileInput2
          {...register("image")}
          multiple={false}
          accept="image/png, image/jpeg"
          previewFile={getFileFromFrom("image")}
          placeholderText={currentUser.name!}
          onClear={() => setValue("image", null)}
        />
      </Settings.FormControl>
      <Settings.FormControl label="Zdjęcie w tle" error={errors.backgroundImage?.message}>
        <FileInput2
          {...register("backgroundImage")}
          multiple={false}
          accept="image/png, image/jpeg"
          previewFile={getFileFromFrom("backgroundImage")}
          onClear={() => setValue("backgroundImage", null)}
          previewType="background"
        />
      </Settings.FormControl>
      <Settings.FormControl label="Opis" error={errors.description?.message}>
        <textarea
          {...register("description", {
            maxLength: { value: 80, message: "Opis jest za długi" },
          })}
          className="textarea-secondary textarea textarea-md"
          defaultValue={currentUser.description!}
        />
      </Settings.FormControl>
      <Settings.Footer>
        <LoadingButton loading={isLoading} className="btn-primary btn-sm btn" type="submit">
          Zapisz
        </LoadingButton>
      </Settings.Footer>
    </Settings.Form>
  );
};

export default AccountForm;
