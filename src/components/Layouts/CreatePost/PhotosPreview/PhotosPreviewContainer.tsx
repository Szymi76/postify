import React, { useState } from "react";
import { useCreatePostContext } from "../CreatePostContext";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import RestPhotosDetails from "./RestPhotosDetails";
import { Box, Flex, Icon, QuestionMarkTooltip } from "~/components/Shared";
import styled from "styled-components";
import Image from "next/image";

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
      <Box style={{ position: "relative", height: 24 }}>
        <QuestionMarkTooltip
          id="photos-preview-container-tooltip"
          content="Zdjęcia, które zostaną umieszczone w twoim poście. Max. 8 zdjęć w jednym poście."
          right={0}
        />
      </Box>
      <Flex direction="column" items="flex-end" style={{ width: "100%" }}>
        <PhotosPreviewContainerWrapper>
          {limitedImages.map((photo, index) => {
            const url = URL.createObjectURL(photo);

            return (
              <Box key={photo.name} style={{ position: "relative" }}>
                <Image
                  height={80}
                  width={80}
                  src={url}
                  alt="Wybrane zdjęcie"
                  style={{ height: 80, width: 80, objectFit: "cover" }}
                />
                <DeleteIconWrapper>
                  <StyledIcon>
                    <TrashIcon onClick={() => handleRemoveImage(index)} />
                  </StyledIcon>
                </DeleteIconWrapper>
              </Box>
            );
          })}

          {canShowPhotos && (
            <RestPhotosDetails
              text={"+" + additionalPhotos.toString()}
              tooltipText="Pokaż reszte zdjęć"
              icon={<EyeIcon onClick={() => setShowAllPhotos(true)} />}
            />
          )}

          {canHidePhotos && (
            <RestPhotosDetails
              text="+0"
              tooltipText="Ukryj zdjęcia"
              icon={<EyeSlashIcon onClick={() => setShowAllPhotos(false)} />}
            />
          )}
        </PhotosPreviewContainerWrapper>
      </Flex>
    </>
  );
};

export default PhotosPreviewContainer;

const PhotosPreviewContainerWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  max-width: 62%;
  border-radius: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.palette.gray[200]};
  padding: ${props => props.theme.spacing.md};
  @media (max-width: ${props => props.theme.breakpoint.md}) {
    max-width: 273px;
  }
`;

const DeleteIconWrapper = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  opacity: 0;
  transition-duration: 100ms;
  :hover {
    opacity: 1;
  }
`;

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.palette.error};
  height: 40px;
  width: 40px;
`;
