import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import styled from "styled-components";
import { Button } from "~/components/Shared";

export type PhotoPickerButtonProps = { onPhotosChange: (files: File[]) => void };
export const PhotoPickerButton = (props: PhotoPickerButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      props.onPhotosChange([...e.target.files]);
    }
  };

  return (
    <Button variant="outlined" style={{ position: "relative" }}>
      <PhotoIcon height={22} width={22} />
      Dodaj zdjęcia
      <HiddenFileInput
        type="file"
        accept="image/png, image/gif, image/jpeg"
        multiple={true}
        onChange={handleChange}
      />
    </Button>
  );
};

const HiddenFileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
`;
