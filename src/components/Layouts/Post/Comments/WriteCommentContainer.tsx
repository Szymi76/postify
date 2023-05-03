import React, { useState } from "react";
import { usePostContext } from "../PostContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import { Avatar, Box, Flex, LoadingButton, Textarea } from "~/components/Shared";

const WriteCommentContainer = () => {
  const { id: postId } = usePostContext().post;
  const { mutateAsync: addComment, isLoading } = api.comment.add.useMutation();
  const router = useRouter();
  const [text, setText] = useState("");
  const currentUser = useSession().data!.user;
  const utils = api.useContext();

  const handleAddComment = async () => {
    await addComment({ text, postId });
    await utils.comment.getInfiniteComments.refetch({ postId, limit: 5 });
    setText("");
  };

  const autoFocusTextarea = router.asPath.includes("#write-comment");
  const buttonDisabled = text.length == 0;

  return (
    <Box style={{ marginTop: 12 }}>
      <Flex justify="space-between" gap="lg">
        <Avatar src={currentUser.image} placeholderText={currentUser.name} />
        <Textarea
          placeholder="Twój komentarz..."
          maxLength={120}
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus={autoFocusTextarea}
          style={{ width: "calc(100% - 64px)" }}
        />
      </Flex>
      <Flex style={{ marginTop: 12 }} justify="flex-end">
        <LoadingButton
          isLoading={isLoading}
          disabled={buttonDisabled}
          onClick={() => void handleAddComment()}
        >
          Skomentuj
        </LoadingButton>
      </Flex>
    </Box>
  );
};

export default WriteCommentContainer;
