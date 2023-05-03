import React, { useState } from "react";
import { CreatePostContext, type Values } from "./CreatePostContext";
import { useSession } from "next-auth/react";
import { Avatar, Flex, LoadingButton, Paper, Textarea } from "~/components/Shared";
import PhotosPreviewContainer from "./PhotosPreview/PhotosPreviewContainer";
import TaggedUsersPreviewContainer from "./TaggedUsersPreview/TaggedUsersPreviewContainer";
import { PhotoPickerButton } from "./Buttons/PhotoPickerButton";
import { EmojiPickerButton } from "./Buttons/EmojiPickerButton";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";
import { TagUsersButton } from "./Buttons/TagUsersButton";
import styled from "styled-components";

const CreatePostContainer = () => {
  const [values, setValues] = useState<Values>({ text: "", images: [], taggedUsersIds: [] });
  const { status, data: session } = useSession();
  const { mutateAsync: createNewPost } = api.post.add.useMutation();
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  const utils = api.useContext();
  const { text, images, taggedUsersIds } = values;

  if (status == "unauthenticated") return <></>;

  const updateValues = (newValues: Partial<Values>) => {
    setValues(values => {
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
      const imagesPromises = images.map(img => uploadFile(img));
      const urls = (await Promise.all(imagesPromises)) as string[];
      await createNewPost({ text, images: urls, taggedUsersIds });
      setValues({ text: "", images: [], taggedUsersIds: [] });
      await utils.post.getInfiniteLatestsPostsIds.refetch({ limit: 5 });
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
      <Paper style={{ width: "100%" }}>
        <Flex justify="space-between" gap="md">
          <Avatar src={currentUser.image} placeholderText={currentUser.name} />
          <StyledTextarea
            value={values.text}
            onChange={e => updateValues({ text: e.target.value })}
            placeholder="Napisz jak minął ci dzień..."
            maxLength={200}
          />
        </Flex>
        <Flex direction="column" items="flex-end" gap="md">
          <PhotosPreviewContainer />
          <TaggedUsersPreviewContainer />
          <Flex justify="flex-end" gap="md">
            <PhotoPickerButton
              onPhotosChange={newImages => updateValues({ images: [...images, ...newImages] })}
            />
            <EmojiPickerButton onEmojiClick={({ emoji }) => updateValues({ text: text + emoji })} />
            <TagUsersButton />
          </Flex>

          <Flex justify="flex-end">
            <LoadingButton
              disabled={isPostEmpty}
              isLoading={isUploadingPost}
              onClick={() => void handleCreateNewPost()}
            >
              Opublikuj
            </LoadingButton>
          </Flex>
        </Flex>
      </Paper>
    </CreatePostContext.Provider>
  );
};

export default CreatePostContainer;

const StyledTextarea = styled(Textarea)`
  width: calc(100% - 64px);
  margin-bottom: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.palette.gray[100]};
`;
