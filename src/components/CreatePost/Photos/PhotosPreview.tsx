import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useState } from "react";

export type PhotosPreviewProps = { photos: File[]; onFileRemove: (index: number) => void };
export const PhotosPreview = (props: PhotosPreviewProps) => {
  const [showAll, setShowAll] = useState(false);

  if (props.photos.length == 0) return <></>;

  const limit = 4;
  const limitedPhotos = showAll ? props.photos : props.photos.slice(0, limit);
  const additionalPhotos = props.photos.length - limit;

  return (
    <div className="flex w-full flex-col items-end">
      <div className="flex max-w-[273px] flex-wrap gap-2 rounded-lg bg-slate-200 p-2 md:max-w-[62%]">
        {limitedPhotos.map((photo, index) => {
          const url = URL.createObjectURL(photo);

          return (
            <div key={photo.name} className="relative">
              <img src={url} alt="Wybrane zdjęcie" className="h-20 w-20 rounded-md object-cover" />
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-secondary bg-opacity-60 opacity-0 duration-100 hover:opacity-100">
                <TrashIcon
                  className="h-10 cursor-pointer text-red-600"
                  onClick={() => props.onFileRemove(index)}
                />
              </div>
            </div>
          );
        })}
        {additionalPhotos > 0 && !showAll && (
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-slate-400 p-2 text-lg text-gray-100">
            <div className="flex">+{additionalPhotos}</div>
            <div className="tooltip" data-tip="Pokaż reszte zdjęć">
              <EyeIcon
                className="h-6 cursor-pointer hover:scale-110"
                onClick={() => setShowAll(true)}
              />
            </div>
          </div>
        )}
        {additionalPhotos > 0 && showAll && (
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-slate-400 p-2 text-lg text-gray-100">
            <div className="flex">+0</div>
            <div className="tooltip" data-tip="Ukryj zdjęcia">
              <EyeSlashIcon
                className="h-6 cursor-pointer hover:scale-110"
                onClick={() => setShowAll(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
