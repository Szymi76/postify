import Image from "next/image";
import styled from "styled-components";
import { Box, Paper } from "~/components/Shared";

type ImagesTilesProps = {
  images: string[];
  cols?: number;
  lastImageWide?: boolean;
};
const ImagesTiles = (props: ImagesTilesProps) => {
  return (
    <ImagesTilesWrapper cols={props.cols}>
      {props.images.map((img, index) => {
        return (
          <ImageWrapper key={`img-${index}`} lastImageWide={props.lastImageWide}>
            <StyledImage src={img} height={250} width={350} alt="Zdjęcie w poście" />
          </ImageWrapper>
        );
      })}
    </ImagesTilesWrapper>
  );
};

export default ImagesTiles;

type ImagesTilesWrapperProps = { cols?: number };
export const ImagesTilesWrapper = styled(Box)<ImagesTilesWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols ?? 2}, minmax(0, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

type ImageWrapperProps = { lastImageWide?: boolean };
export const ImageWrapper = styled(Paper)<ImageWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  :last-child {
    grid-column: span ${props => (props.lastImageWide ? 2 : 1)} / span 2;
  }
`;

export const StyledImage = styled(Image)`
  max-height: 350px;
  border-radius: ${props => props.theme.spacing.md};
`;
