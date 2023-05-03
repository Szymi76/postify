import React from "react";
import SingleTaggedUserContainer from "./SingleTaggedUserContainer";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import { type User } from "@prisma/client";
import { Box, Flex, Name } from "~/components/Shared";
import styled from "styled-components";

type TaggedUsersContainerProps = { users: User[] };
const TaggedUsersContainer = (props: TaggedUsersContainerProps) => {
  if (props.users.length == 0) return <></>;

  return (
    <Flex items="center" gap="sm" style={{ flexWrap: "wrap" }}>
      <UserGroupIcon height={28} width={28} />
      <Name>Oznaczeni</Name>
      <TaggedUserWrapper>
        {props.users.map((user, index) => (
          <SingleTaggedUserContainer
            key={user.id}
            user={user}
            isLastInList={index == props.users.length - 1}
          />
        ))}
      </TaggedUserWrapper>
    </Flex>
  );
};

export default TaggedUsersContainer;

const TaggedUserWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-left: ${props => props.theme.spacing.md};
`;
