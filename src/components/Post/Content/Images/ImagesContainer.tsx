import React, { useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import ImagesTiles from "./ImagesTiles";

type ImagesContainerProps = { images: string[] };
const ImagesContainer = (props: ImagesContainerProps) => {
  const [showAll, setShowAll] = useState(false);

  const len = props.images.length;
  const limitedImages = showAll ? props.images : props.images.slice(0, 3);

  if (len == 0) return <></>;
  if (len == 1)
    return <ImagesTiles images={props.images} wrapperClassName="grid grid-cols-1 gap-2" />;
  if (len == 2 || len == 4) return <ImagesTiles images={props.images} />;
  if (len == 3) return <ImagesTiles images={props.images} singleTileClassName="last:col-span-2" />;

  return (
    <div className="grid grid-cols-2 gap-2">
      {limitedImages.map((img, index) => {
        return (
          <div
            key={`img-${index}`}
            className="flex items-center justify-center rounded-md border border-slate-100 p-3 "
          >
            <img src={img} className="max-h-[350px] rounded-md" />
          </div>
        );
      })}
      <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 p-3">
        <p className="text-xl font-medium">+{showAll ? 0 : len - 3}</p>
        <div
          className="tooltip cursor-pointer duration-100 active:scale-90"
          data-tip={showAll ? "Ukryj zdjęcia" : "Pokaż wszystkie zdjęcia"}
        >
          {showAll ? (
            <EyeSlashIcon className="h-8" onClick={() => setShowAll(false)} />
          ) : (
            <EyeIcon className="h-8" onClick={() => setShowAll(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesContainer;
