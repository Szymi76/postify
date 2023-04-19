import React from "react";
import { usePostContext } from "../PostContext";
import TaggedUsersContainer from "./TaggedUsers/TaggedUsersContainer";
import ImagesContainer from "./Images/ImagesContainer";

const ContentContainer = () => {
  const { post } = usePostContext();

  const taggedUsers = post.taggedUsers.map((user) => user.taggedUser) ?? [];
  const images = post.images ?? [];

  return (
    <div className="flex flex-col gap-2">
      <p>{post.text}</p>
      <TaggedUsersContainer users={taggedUsers} />
      <ImagesContainer images={images} />
    </div>
  );
};

export default ContentContainer;
