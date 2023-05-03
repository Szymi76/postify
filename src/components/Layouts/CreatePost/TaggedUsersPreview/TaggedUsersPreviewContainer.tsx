import React from "react";
import { useCreatePostContext } from "../CreatePostContext";
import { api } from "~/utils/api";
import { Box, Flex, QuestionMarkTooltip } from "~/components/Shared";
import SmallUserCard from "./SmallUserCard";
import styled from "styled-components";

const TaggedUsersPreviewContainer = () => {
  const { values } = useCreatePostContext();
  const { data: users } = api.user.getByIds.useQuery({ ids: values.taggedUsersIds });

  if (!users || users.length == 0) return <></>;

  return (
    <>
      <Box style={{ position: "relative", height: 24 }}>
        <QuestionMarkTooltip
          id="TaggedUsersPreviewContainer"
          content="Osoby, które będą oznaczone w twoim poście."
          right={0}
        />
      </Box>
      <Flex justify="flex-end">
        <SmallUserCardWrapper>
          {users.map(user => (
            <SmallUserCard key={user.id} user={user} />
          ))}
        </SmallUserCardWrapper>
      </Flex>
    </>
  );
};

export default TaggedUsersPreviewContainer;

const SmallUserCardWrapper = styled(Box)`
  display: flex;
  max-width: 550px;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.palette.gray[200]};
  padding: ${props => props.theme.spacing.md};
`;
