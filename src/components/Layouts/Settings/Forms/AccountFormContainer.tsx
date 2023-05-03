import React, { useEffect, useState } from "react";
import * as Settings from "~/components/Layouts/Settings/Layouts";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Description,
  FileInput,
  Flex,
  InputField,
  LoadingButton,
  Name,
  TextInput,
  Textarea,
} from "~/components/Shared";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";
import { useAlert } from "~/providers/AlertsProvider/useAlert";

type Inputs = {
  name: string;
  image?: FileList | string | null;
  backgroundImage?: FileList | string | null;
  description: string;
};

const AccountFormContainer = () => {
  const { data: session, update } = useSession();
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

  const currentUser = session!.user;

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
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoading(true);

      const { name, description } = data;
      const image = await validateImage(data.image);
      const backgroundImage = await validateImage(data.backgroundImage);

      await updateUserData({ name, image, backgroundImage, description });
      await update();
      pushAlert({ text: "Dane zostały zaktualizowane", type: "primary" });
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
    /* eslint-disable */
    <Settings.FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Settings.FormContainer>
        <Settings.FormTitle>Konto</Settings.FormTitle>
        <Flex direction="column">
          <Name>Profil</Name>
          <Description>
            Te informacje będą widoczne publicznie więc uważaj co wpisujesz.
          </Description>
        </Flex>
        <InputField label="Twoja nazwa" error={errors.name?.message} style={{ maxWidth: 275 }}>
          <TextInput
            {...register("name", {
              required: { value: true, message: "Twoja nazwa nie może być pusta" },
              minLength: { value: 4, message: "Twoja nazwa jest za krótka" },
              maxLength: { value: 16, message: "Twoja nazwa jest za długa" },
            })}
            defaultValue={currentUser.name!}
          />
        </InputField>
        <InputField label="Zdjęcie profilowe" error={errors.image?.message}>
          <FileInput
            {...register("image")}
            multiple={false}
            accept="image/png, image/jpeg"
            previewFile={getFileFromFrom("image")}
            placeholderText={currentUser.name!}
            onClear={() => setValue("image", null)}
          />
        </InputField>
        <InputField label="Zdjęcie w tle" error={errors.backgroundImage?.message}>
          <FileInput
            {...register("backgroundImage")}
            multiple={false}
            accept="image/png, image/jpeg"
            previewFile={getFileFromFrom("backgroundImage")}
            onClear={() => setValue("backgroundImage", null)}
            previewType="background"
          />
        </InputField>
        <InputField label="Opis" error={errors.description?.message}>
          <Textarea
            {...register("description", {
              maxLength: { value: 80, message: "Opis jest za długi" },
            })}
            defaultValue={currentUser.description!}
            style={{ maxWidth: 375 }}
          />
        </InputField>
        <Settings.FormFooter>
          <LoadingButton isLoading={isLoading}>Zapisz</LoadingButton>
        </Settings.FormFooter>
      </Settings.FormContainer>
    </Settings.FormWrapper>
  );
};

export default AccountFormContainer;
