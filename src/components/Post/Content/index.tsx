import React from "react";
import { RouterOutputs } from "~/utils/api";
import TaggedUsers from "./TaggedUsers";
import Images from "./Images";

type ContentProps = { post: RouterOutputs["post"]["getPostById"] };
const Content = (props: ContentProps) => {
  const { post } = props;

  const taggedUsers = post?.taggedUsers.map((user) => user.taggedUser) ?? [];
  const images = post?.images ?? [];

  return (
    <div className="flex flex-col gap-2">
      <p>{post?.text}</p>
      <TaggedUsers users={taggedUsers} />
      <Images images={images} />
    </div>
  );
};

export default Content;
