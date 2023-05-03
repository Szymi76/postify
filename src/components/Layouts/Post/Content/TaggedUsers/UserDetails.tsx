import { type User } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { Paper, UserCard } from "~/components/Shared";
import { scaleIn } from "~/styles/animations";

type UserDetailsProps = { user: User };
const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <UserDetailsWrapper>
      <UserCard name={user.name} src={user.image} secondaryText={user.description} />
    </UserDetailsWrapper>
  );
};

export default UserDetails;

const UserDetailsWrapper = styled(Paper)`
  display: flex;
  height: 75px;
  width: 250px;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  animation: 100ms ${scaleIn};
`;
