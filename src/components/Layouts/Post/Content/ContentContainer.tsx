import React from "react";
import { usePostContext } from "../PostContext";
import TaggedUsersContainer from "./TaggedUsers/TaggedUsersContainer";
import ImagesContainer from "./Images/ImagesContainer";
import { Flex, Paragraph } from "~/components/Shared";

const ContentContainer = () => {
  const { post } = usePostContext();

  const taggedUsers = post.taggedUsers.map(user => user.taggedUser) ?? [];
  const images = post.images ?? [];

  return (
    <Flex direction="column" gap="md">
      <Paragraph>{post.text}</Paragraph>
      <TaggedUsersContainer users={taggedUsers} />
      <ImagesContainer images={images} />
    </Flex>
  );
};

export default ContentContainer;
