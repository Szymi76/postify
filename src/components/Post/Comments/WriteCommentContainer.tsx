import React, { useState } from "react";
import { usePostContext } from "../PostContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import { Avatar, LoadingButton } from "~/components/Global";

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
    <div className="mt-3">
      <div className="flex justify-between gap-5">
        <Avatar src={currentUser.image} placeholderText={currentUser.name} />
        <textarea
          className="textarea min-h-16 flex-1 bg-slate-200  focus:outline-slate-200"
          placeholder="Twój komentarz..."
          maxLength={120}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus={autoFocusTextarea}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <LoadingButton
          loading={isLoading}
          disabled={buttonDisabled}
          className="btn-primary btn-sm btn"
          onClick={() => void handleAddComment()}
        >
          Skomentuj
        </LoadingButton>
      </div>
    </div>
  );
};

export default WriteCommentContainer;
