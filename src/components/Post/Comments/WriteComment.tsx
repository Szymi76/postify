import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { Avatar, LoadingButton } from "~/components/Global";
import { api } from "~/utils/api";

type WriteCommentProps = { postId: string; refetch: () => void };
const WriteComment = (props: WriteCommentProps) => {
  const { mutateAsync: addComment, isLoading } = api.comment.add.useMutation();
  const [text, setText] = useState("");
  const currentUser = useSession().data!.user;

  const handleAddComment = async () => {
    await addComment({ text, postId: props.postId });
    props.refetch();
    setText("");
  };

  const buttonDisabled = text.length == 0;

  return (
    <div className="mt-3">
      <div className="flex justify-between gap-5">
        <Avatar src={currentUser.image} text={currentUser.name} />
        <textarea
          className="textarea min-h-16 flex-1 bg-slate-200  focus:outline-slate-200"
          placeholder="Twój komentarz..."
          maxLength={120}
          value={text}
          onChange={(e) => setText(e.target.value)}
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

export default WriteComment;
