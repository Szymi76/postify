import { type Notification, type User } from "@prisma/client";
import React from "react";
import { createNotificationText, timeFromNow } from "~/utils/other";
import { Avatar } from "~/components/Shared/Avatar";
import { Box, Flex } from "./Styled/Layouts";
import styled from "styled-components";
import { Description, Name, Paragraph } from "./Styled/Text";

type NotificationCardProps = { notification: Notification & { creator: User } };
export const NotificationCard = (props: NotificationCardProps) => {
  const { type, creator, createdAt } = props.notification;
  const text = createNotificationText(type, creator.name ?? "Ktoś");

  return (
    <Flex items="center" gap="lg">
      <Avatar src={creator.image} placeholderText={creator.name} />
      <NotificationCardContent>
        <Name>{creator.name}</Name>
        <Paragraph>{text}</Paragraph>
        <Description>{timeFromNow(createdAt)}</Description>
      </NotificationCardContent>
    </Flex>
  );
};

const NotificationCardContent = styled(Box)`
  font-size: ${props => props.theme.font.size.sm};
  width: calc(100% - 64px);
`;
