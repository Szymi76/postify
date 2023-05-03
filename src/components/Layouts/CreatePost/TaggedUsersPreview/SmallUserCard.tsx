import { type User } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { Avatar, Box, Name } from "~/components/Shared";

type SmallUserCardProps = { user: User };
const SmallUserCard = (props: SmallUserCardProps) => {
  const { user } = props;
  return (
    <SmallUserCardWrapper>
      <Avatar src={user?.image} placeholderText={user.name} size={32} />
      <Name>{user.name}</Name>
    </SmallUserCardWrapper>
  );
};

export default SmallUserCard;

const SmallUserCardWrapper = styled(Box)`
  display: flex;
  width: min-content;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  white-space: nowrap;
  background-color: ${props => props.theme.palette.gray[300]};
  border-radius: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
`;
