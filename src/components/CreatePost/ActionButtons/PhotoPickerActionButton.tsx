import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";

export type PhotoPickerActionButtonProps = { onPhotosChange: (files: File[]) => void };
export const PhotoPickerActionButton = (props: PhotoPickerActionButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      props.onPhotosChange([...e.target.files]);
    }
  };

  return (
    <button className="btn-action btn-primary ">
      <PhotoIcon className="h-6" />
      Dodaj zdjęcia
      <input
        type="file"
        className="absolute h-full w-full opacity-0"
        accept="image/png, image/gif, image/jpeg"
        multiple={true}
        onChange={handleChange}
      />
    </button>
  );
};
