import React from "react";
import SideBar from "~/components/Settings/SideBar";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, PAGES } from "~/constants";
import { PageComponentRequiredProps } from "~/layouts/ComponentRequiredPropsHandler";
import * as Settings from "~/components/Settings/Layouts";
import { useForm, SubmitHandler } from "react-hook-form";
import { FileInput2, LoadingButton } from "~/components/Global";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { reloadSession, uploadFile } from "~/utils/other";
import { useAlert } from "~/store";

type ImageType = File | string | null | undefined;

type Inputs = {
  name: string;
  image?: FileList;
  backgroundImage?: FileList;
  description: string;
};

const AccountSettings = () => {
  const currentUser = useSession().data!.user;
  const { pushAlert } = useAlert();
  const { mutateAsync: updateUserData, isLoading } = api.user.update.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.preventDefault();
    const { name, description } = data;
    let image: ImageType = undefined;
    if (data.image && data.image.length == 1) image = data.image[0];
    let backgroundImage: ImageType = undefined;
    if (data.backgroundImage && data.backgroundImage.length == 1)
      backgroundImage = data.backgroundImage[0];

    if (image) image = await uploadFile(image);
    if (backgroundImage) backgroundImage = await uploadFile(backgroundImage);

    await updateUserData({ name, image, backgroundImage, description });
    reloadSession();
    pushAlert({ text: "Dane zostały zaktualizowane", type: "info" });
  };

  const image = watch("image");
  const imagePreview = image && image.length == 1 ? image[0] : undefined;
  const backgroundImage = watch("backgroundImage");
  const backgroundImagePreview =
    backgroundImage && backgroundImage.length == 1 ? backgroundImage[0] : undefined;

  return (
    <Settings.Wrapper>
      <SideBar currentPageHref={PAGES.SETTINGS.ACCOUNT} />
      <Settings.Form onSubmit={handleSubmit(onSubmit)}>
        <Settings.Title>Konto</Settings.Title>
        <Settings.SectionDescription
          title="Profil"
          description="Te informacje będą widoczne publicznie więc uważaj co wpisujesz."
        />
        {/* NAZWA */}
        <Settings.InputControl label="Widoczna nazwa" error={errors.name?.message}>
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
        </Settings.InputControl>
        <Settings.InputControl label="Zdjęcie profilowe" error={errors.image?.message}>
          <FileInput2
            {...register("image")}
            multiple={false}
            accept="image/png, image/jpeg"
            previewFile={imagePreview ?? currentUser.image!}
            placeholderText={currentUser.name!}
            onClear={() => setValue("image", undefined)}
          />
        </Settings.InputControl>
        <Settings.InputControl label="Zdjęcie w tle" error={errors.backgroundImage?.message}>
          <FileInput2
            {...register("backgroundImage")}
            multiple={false}
            accept="image/png, image/jpeg"
            previewFile={backgroundImagePreview ?? currentUser.backgroundImage!}
            onClear={() => setValue("backgroundImage", undefined)}
            previewType="background"
          />
        </Settings.InputControl>
        <Settings.InputControl label="Opis" error={errors.description?.message}>
          <textarea
            {...register("description")}
            className="textarea-secondary textarea textarea-md"
            defaultValue={currentUser.description ?? undefined}
          />
        </Settings.InputControl>
        <Settings.Footer>
          {/* <button className="btn-secondary btn-sm btn" type="button">
            Anuluj
          </button> */}
          <LoadingButton loading={isLoading} className="btn-primary btn-sm btn" type="submit">
            Zapisz
          </LoadingButton>
        </Settings.Footer>
      </Settings.Form>
    </Settings.Wrapper>
  );
};

const requiredPageProps: PageComponentRequiredProps = {
  auth: "only-authenticated",
  header: "include",
};

AccountSettings.requiredPageProps = requiredPageProps;
export default AccountSettings;
