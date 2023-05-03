import React from "react";
import Image from "next/image";
import styled from "styled-components";

type AvatarProps = {
  src?: string | null;
  placeholderText?: string | null;
  size?: number;
};
/**
 * Awatar użytkownika
 */
export const Avatar = (props: AvatarProps) => {
  const src = props.src ?? undefined;
  const placeholderText = props.placeholderText ?? undefined;
  const size = props.size ?? 48;

  return (
    <AvatarWrapper style={{ height: size, width: size }}>
      {src ? (
        <Image
          src={src}
          height={size}
          width={size}
          alt="Avatar użytkownika"
          style={{ objectFit: "fill", height: size, width: size }}
        />
      ) : placeholderText ? (
        placeholderText[0]
      ) : (
        ""
      )}
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  background-color: ${props => props.theme.palette.gray[200]};
  font-weight: ${props => props.theme.font.weight.medium};
  overflow: hidden;
`;
