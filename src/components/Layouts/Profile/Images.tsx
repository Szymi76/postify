import { type User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Avatar, Box } from "~/components/Shared";

type ImagesProps = { user: User };
const Images = (props: ImagesProps) => {
  const bgImageUrl = props.user.backgroundImage;

  return (
    <ImagesWrapper>
      {bgImageUrl && <StyledImage src={bgImageUrl} height={225} width={500} alt="Zdjęcie w tle" />}
      <AvatarWrapper>
        <Avatar src={props.user.image} placeholderText={props.user.name} size={112} />
      </AvatarWrapper>
    </ImagesWrapper>
  );
};

export default Images;

const ImagesWrapper = styled(Box)`
  position: relative;
  height: 225px;
  width: 100%;
  background-color: ${props => props.theme.palette.gray[200]};
  border-radius: ${props => props.theme.spacing.md};
`;

const AvatarWrapper = styled(Box)`
  border-radius: 9999px;
  border: 8px solid ${props => props.theme.palette.white};
  position: absolute;
  bottom: -56px;
  left: 28px;
`;

const StyledImage = styled(Image)`
  height: 225px;
  width: 100%;
  object-fit: cover;
  border-radius: ${props => props.theme.spacing.md};
`;
