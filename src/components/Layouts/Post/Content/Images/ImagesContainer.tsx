import React, { useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import ImagesTiles, { ImageWrapper, ImagesTilesWrapper, StyledImage } from "./ImagesTiles";
import { Icon, Name, Tooltip } from "~/components/Shared";

type ImagesContainerProps = { images: string[] };
const ImagesContainer = (props: ImagesContainerProps) => {
  const [showAll, setShowAll] = useState(false);

  const len = props.images.length;
  const limitedImages = showAll ? props.images : props.images.slice(0, 3);

  if (len == 0) return <></>;
  if (len == 1) return <ImagesTiles images={props.images} cols={1} />;
  if (len == 2 || len == 4) return <ImagesTiles images={props.images} />;
  if (len == 3) return <ImagesTiles images={props.images} lastImageWide />;

  return (
    <ImagesTilesWrapper>
      {limitedImages.map((img, index) => {
        return (
          <ImageWrapper key={`img-${index}`}>
            <StyledImage src={img} height={350} width={250} alt="Zdjęcie w poście" />
          </ImageWrapper>
        );
      })}
      <ImageWrapper style={{ flexDirection: "column" }}>
        <Name>+{showAll ? 0 : len - 3}</Name>
        <Tooltip
          id="ImagesContainer"
          content={showAll ? "Ukryj zdjęcia" : "Pokaż wszystkie zdjęcia"}
        >
          <Icon>
            {showAll ? (
              <EyeSlashIcon height={32} width={32} onClick={() => setShowAll(false)} />
            ) : (
              <EyeIcon height={32} width={32} onClick={() => setShowAll(true)} />
            )}
          </Icon>
        </Tooltip>
      </ImageWrapper>
    </ImagesTilesWrapper>
  );
};

export default ImagesContainer;
