import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "~/components/Global/Avatar";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";
import { CreatePostSkeleton } from "./CreatePostSkeleton";
import { PhotosPreview } from "./Photos/PhotosPreview";
import { TaggedUsersPreview } from "./TaggedUsers/TaggedUsersPreview";
import { PhotoPickerActionButton } from "./ActionButtons/PhotoPickerActionButton";
import { EmojiPickerActionButton } from "./ActionButtons/EmojiPickerActionButton";
import { TagUsersActionButton } from "./ActionButtons/TagUsersActionButtonProps";
import HiddenTooltip from "./HiddenTooltip";
import { LoadingButton } from "../Global";

const CreatePost = () => {
  const { status, data: session } = useSession();
  const { mutateAsync: createNewPost } = api.post.add.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [taggedUsersIds, setTaggedUsersIds] = useState<string[]>([]);

  if (status == "loading") return <CreatePostSkeleton />;
  if (status == "unauthenticated") return <></>;

  const clearStates = () => {
    setText("");
    setImages([]);
    setTaggedUsersIds([]);
  };

  const handleToggleTaggedUser = (id: string) => {
    const isUserTagged = taggedUsersIds.includes(id);
    setTaggedUsersIds(
      isUserTagged ? taggedUsersIds.filter((userId) => userId != id) : [...taggedUsersIds, id]
    );
  };

  const handleCreateNewPost = async () => {
    try {
      setIsLoading(true);
      const imagesPromises = images.map((img) => uploadFile(img));
      const urls = (await Promise.all(imagesPromises)) as string[];
      await createNewPost({ text, images: urls, taggedUsersIds });
      clearStates();
      setIsLoading(false);
    } catch (err) {
      console.warn("Nie udało się opublikować postu.");
      setIsLoading(false);
    }
  };

  const isPostEmpty = !Boolean(text || images.length > 0);
  const currentUser = session!.user;
  const isImagesArrayNotEmpty = images.length > 0;
  const isTaggedUsersIdsArrayNotEmpty = taggedUsersIds.length > 0;

  return (
    <div className="layout w-full">
      {/* AVATAR I POLE TEKSTOWE */}
      <div className="flex justify-between gap-5">
        <Avatar src={currentUser.image} />
        <textarea
          className="textarea min-h-16 flex-1 bg-slate-200  focus:outline-slate-200"
          placeholder="Napisz jak minął ci dzień..."
          maxLength={120}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-end gap-2 py-2">
        {/* TOOLTIP I LISTA ZDJĘĆ */}
        <HiddenTooltip
          show={isImagesArrayNotEmpty}
          text="Zdjęcia, które zostaną umieszczone w twoim poście. Max. 8 zdjęć w jednym poście."
        />
        <PhotosPreview
          photos={images}
          onFileRemove={(index) => setImages(images.filter((img, i) => i != index))}
        />

        {/* TOOLTIP I LISTA OZNACZONYCH UŻYTKOWNIKÓW */}
        <HiddenTooltip
          show={isTaggedUsersIdsArrayNotEmpty}
          text="Lista osób, które pojawią się jako oznaczone w twoim poście."
        />
        <TaggedUsersPreview taggedUsersIds={taggedUsersIds} />

        {/* PRZYCISKI */}
        <div className="flex flex-wrap justify-end gap-2">
          <PhotoPickerActionButton onPhotosChange={(files) => setImages([...images, ...files])} />
          <EmojiPickerActionButton onEmojiClick={(emoji) => setText(text + emoji.emoji)} />
          <TagUsersActionButton
            onToggleUser={handleToggleTaggedUser}
            taggedUsersIds={taggedUsersIds}
          />
        </div>

        {/* PRZYCISK Z TWORZENIEM POSTU */}
        <div className="mt-2 flex justify-end">
          <LoadingButton
            className="btn-primary btn-sm btn"
            disabled={isPostEmpty}
            loading={isLoading}
            onClick={() => void handleCreateNewPost()}
          >
            Opublikuj
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
