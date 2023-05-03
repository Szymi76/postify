import React from "react";
import { Description, Name } from "./Styled/Text";
import { Flex } from "./Styled/Layouts";
import { Avatar } from "./";
import { useTheme } from "styled-components";

/**
 * Karta użytkownika z awatarem, nazwą i opcionalnym tekstem
 */

type UserCardProps = {
  src?: string | null;
  name?: string | null;
  secondaryText?: string | null;
  withTitles?: boolean;
};

export const UserCard = (props: UserCardProps) => {
  const { src, withTitles } = props;

  const name = props.name ?? undefined;
  const secondaryText = props.secondaryText ?? undefined;

  return (
    <Flex gap="md">
      <Avatar src={src} placeholderText={name} />
      <Flex direction="column" justify={secondaryText ? "center" : "flex-start"}>
        <Name title={withTitles ? name : undefined}>{name}</Name>
        {secondaryText && (
          <Description title={withTitles ? secondaryText : undefined}>{secondaryText}</Description>
        )}
      </Flex>
    </Flex>
  );
};
