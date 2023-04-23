import React, { useState } from "react";
import { useCreatePostContext } from "../CreatePostContext";
import { type ReactChild } from "~/types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import RestPhotosDetails from "./RestPhotosDetails";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { QuestionMarkAsTooltip } from "~/components/Global";

const PHOTOS_LIMIT = 4;

const PhotosPreviewContainer = () => {
  const { values, updateValues } = useCreatePostContext();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (values.images.length == 0) return <></>;

  const handleRemoveImage = (index: number) => {
    const filteredImages = values.images.filter((_, i) => i != index);
    updateValues({ images: filteredImages });
  };

  const limitedImages = showAllPhotos ? values.images : values.images.slice(0, PHOTOS_LIMIT);
  const additionalPhotos = values.images.length - PHOTOS_LIMIT;
  const canShowPhotos = !showAllPhotos && additionalPhotos > 0;
  const canHidePhotos = showAllPhotos && additionalPhotos > 0;

  return (
    <>
      <QuestionMarkAsTooltip
        className="tooltip-left"
        text="Zdjęcia, które zostaną umieszczone w twoim poście. Max. 8 zdjęć w jednym poście."
      />
      <Wrapper>
        {limitedImages.map((photo, index) => {
          const url = URL.createObjectURL(photo);

          return (
            <div key={photo.name} className="relative">
              <img src={url} alt="Wybrane zdjęcie" className="h-20 w-20 rounded-md object-cover" />
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-secondary bg-opacity-60 opacity-0 duration-100 hover:opacity-100">
                <TrashIcon
                  className="h-10 cursor-pointer text-red-600"
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            </div>
          );
        })}

        {canShowPhotos && (
          <RestPhotosDetails
            text={"+" + additionalPhotos.toString()}
            tooltipText="Pokaż reszte zdjęć"
            icon={<EyeIcon className="icon h-6" onClick={() => setShowAllPhotos(true)} />}
          />
        )}

        {canHidePhotos && (
          <RestPhotosDetails
            text="+0"
            tooltipText="Ukryj zdjęcia"
            icon={<EyeSlashIcon className="icon h-6" onClick={() => setShowAllPhotos(false)} />}
          />
        )}
      </Wrapper>
    </>
  );
};

export default PhotosPreviewContainer;

const Wrapper = (props: ReactChild) => {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="flex max-w-[273px] flex-wrap gap-2 rounded-lg bg-slate-200 p-2 md:max-w-[62%]">
        {props.children}
      </div>
    </div>
  );
};
