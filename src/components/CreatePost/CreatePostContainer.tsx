import React, { useState } from "react";
import { CreatePostContext, type Values } from "./CreatePostContext";
import { type ReactChild } from "~/types";
import { useSession } from "next-auth/react";
import CreatePostContainerSkeleton from "./CreatePostContainerSkeleton";
import { Avatar, LoadingButton } from "../Global";
import PhotosPreviewContainer from "./PhotosPreview/PhotosPreviewContainer";
import TaggedUsersPreviewContainer from "./TaggedUsersPreview/TaggedUsersPreviewContainer";
import { PhotoPickerButton } from "./Buttons/PhotoPickerButton";
import { EmojiPickerButton } from "./Buttons/EmojiPickerButton";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";
import { TagUsersButton } from "./Buttons/TagUsersButton";

const CreatePostContainer = () => {
  const [values, setValues] = useState<Values>({ text: "", images: [], taggedUsersIds: [] });
  const { status, data: session } = useSession();
  const { mutateAsync: createNewPost } = api.post.add.useMutation();
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  const utils = api.useContext();
  const { text, images, taggedUsersIds } = values;

  if (status == "loading") return <CreatePostContainerSkeleton />;
  if (status == "unauthenticated") return <></>;

  const updateValues = (newValues: Partial<Values>) => {
    setValues((values) => {
      return {
        text: newValues.text ?? values.text,
        images: newValues.images ?? values.images,
        taggedUsersIds: newValues.taggedUsersIds ?? values.taggedUsersIds,
      };
    });
  };

  const handleCreateNewPost = async () => {
    try {
      setIsUploadingPost(true);
      const imagesPromises = images.map((img) => uploadFile(img));
      const urls = (await Promise.all(imagesPromises)) as string[];
      await createNewPost({ text, images: urls, taggedUsersIds });
      setValues({ text: "", images: [], taggedUsersIds: [] });
      await utils.post.getInfiniteLatestsPostsIds.refetch({ limit: 3 });
    } catch (err) {
      console.warn("Nie udało się opublikować postu");
    } finally {
      setIsUploadingPost(false);
    }
  };

  const currentUser = session!.user;
  const isPostEmpty = !Boolean(text || images.length > 0);

  return (
    <CreatePostContext.Provider value={{ values, updateValues }}>
      <CreatePostWrapper>
        <AvatarAndTextareaWrapper>
          <Avatar src={currentUser.image} />
          <textarea
            className="textarea min-h-16 flex-1 bg-slate-200  focus:outline-slate-200"
            placeholder="Napisz jak minął ci dzień..."
            maxLength={200}
            value={values.text}
            onChange={(e) => updateValues({ text: e.target.value })}
          />
        </AvatarAndTextareaWrapper>
        <Stack>
          <PhotosPreviewContainer />
          <TaggedUsersPreviewContainer />
          <ButtonsRow>
            <PhotoPickerButton
              onPhotosChange={(newImages) => updateValues({ images: [...images, ...newImages] })}
            />
            <EmojiPickerButton onEmojiClick={({ emoji }) => updateValues({ text: text + emoji })} />
            <TagUsersButton />
          </ButtonsRow>

          <LastButtonsRow>
            <LoadingButton
              className="btn-primary btn-sm btn"
              disabled={isPostEmpty}
              loading={isUploadingPost}
              onClick={() => void handleCreateNewPost()}
            >
              Opublikuj
            </LoadingButton>
          </LastButtonsRow>
        </Stack>
      </CreatePostWrapper>
    </CreatePostContext.Provider>
  );
};

export default CreatePostContainer;

const CreatePostWrapper = (props: ReactChild) => {
  return <div className="layout w-full">{props.children}</div>;
};

const AvatarAndTextareaWrapper = (props: ReactChild) => {
  return <div className="flex justify-between gap-5">{props.children}</div>;
};

const Stack = (props: ReactChild) => {
  return <div className="flex flex-col items-end gap-2 py-2">{props.children}</div>;
};

const ButtonsRow = (props: ReactChild) => {
  return <div className="flex flex-wrap justify-end gap-2">{props.children}</div>;
};

const LastButtonsRow = (props: ReactChild) => {
  return <div className="mt-2 flex justify-end">{props.children}</div>;
};
