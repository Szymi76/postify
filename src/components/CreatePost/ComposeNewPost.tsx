import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import Avatar from "~/components/Actions/Avatar";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";
import { ComposeNewPostSkeleton } from "./ComposeNewPostSkeleton";
import { PhotosPreview } from "./Photos/PhotosPreview";
import { TaggedUsersPreview } from "./TaggedUsers/TaggedUsersPreview";
import { PhotoPickerActionButton } from "./ActionButtons/PhotoPickerActionButton";
import { EmojiPickerActionButton } from "./ActionButtons/EmojiPickerActionButton";
import { TagUsersActionButton } from "./ActionButtons/TagUsersActionButtonProps";

export const ComposeNewPost = () => {
  const { status, data: session } = useSession();
  const { mutateAsync: createNewPost } = api.post.add.useMutation();
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [taggedUsersIds, setTaggedUsersIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleTaggedUser = useCallback(
    (id: string) => {
      const isUserTagged = taggedUsersIds.includes(id);
      setTaggedUsersIds(
        isUserTagged ? taggedUsersIds.filter((userId) => userId != id) : [...taggedUsersIds, id]
      );
    },
    [taggedUsersIds]
  );

  if (status == "loading") return <ComposeNewPostSkeleton />;
  if (status == "unauthenticated") return <></>;

  const isPostEmpty = !Boolean(text || images.length > 0);
  const currentUser = session!.user;

  const handleCreateNewPost = async () => {
    try {
      setIsLoading(true);
      const imagesPromises = images.map((img) => uploadFile(img));
      const urls = (await Promise.all(imagesPromises)) as string[];
      await createNewPost({ text, images: urls, taggedUsersIds });
      setText("");
      setImages([]);
      setTaggedUsersIds([]);
      setIsLoading(false);
    } catch (err) {
      console.warn("Nie udało się opublikować postu.");
      setIsLoading(false);
    }
  };

  return (
    <div className="layout mx-auto max-w-3xl ">
      <div className="flex justify-between gap-5">
        {/* AVATAR */}
        <Avatar src={currentUser.image} />
        {/* TEXTFIELD */}
        <textarea
          className="textarea min-h-16 flex-1 bg-slate-200  focus:outline-slate-200"
          placeholder="Napisz jak minął ci dzień..."
          maxLength={120}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-end gap-2 py-2">
        {images.length > 0 && (
          <div
            className="tooltip tooltip-left"
            data-tip="Zdjęcia, które zostaną umieszczone w twoim poście. Max. 8 zdjęć w jednym poście."
          >
            <QuestionMarkCircleIcon className="h-5 text-gray-500" />
          </div>
        )}
        <PhotosPreview
          photos={images}
          onFileRemove={(index) => setImages(images.filter((img, i) => i != index))}
        />
        {taggedUsersIds.length > 0 && (
          <div
            className="tooltip tooltip-left"
            data-tip="Lista osób, które pojawią się jako oznaczone w twoim poście."
          >
            <QuestionMarkCircleIcon className="h-5 text-gray-500" />
          </div>
        )}
        <TaggedUsersPreview taggedUsersIds={taggedUsersIds} />
        {/* BUTTONS */}
        <div className="flex flex-wrap justify-end gap-2">
          <PhotoPickerActionButton onPhotosChange={(files) => setImages([...images, ...files])} />
          <EmojiPickerActionButton onEmojiClick={(emoji) => setText(text + emoji.emoji)} />
          <TagUsersActionButton
            onToggleUser={handleToggleTaggedUser}
            taggedUsersIds={taggedUsersIds}
          />
        </div>
        <div className="mt-2 flex justify-end">
          <button
            className={`btn-primary btn-sm btn ${isLoading ? "loading" : ""}`}
            disabled={isPostEmpty}
            onClick={() => void handleCreateNewPost()}
          >
            Opublikuj
          </button>
        </div>
      </div>
    </div>
  );
};
