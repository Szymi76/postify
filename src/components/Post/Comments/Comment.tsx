import { Comment, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useHover from "~/hooks/useHover";
import { timeFromNow } from "~/utils/other";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

type CommentProps = {
  comment: Comment & { author: User };
  refetch: () => void;
};
const Comment = (props: CommentProps) => {
  const currentUser = useSession().data?.user;
  const [ref, isHovering] = useHover<HTMLDivElement>();
  const { mutateAsync: deleteComment } = api.comment.delete.useMutation();

  const isCurrentUserAuthor = Boolean(props.comment.author.id == currentUser?.id && currentUser.id);

  const handleDeleteComment = async () => {
    await deleteComment({ commentId: props.comment.id });
    props.refetch();
  };

  return (
    <div ref={ref} className="flex justify-between py-1">
      <p>
        <Link href={`profile/${props.comment.author.id}`}>
          <b className="mr-2">{props.comment.author.name}</b>
        </Link>
        {props.comment.text}
        <span className="ml-2 text-sm text-gray-400">{timeFromNow(props.comment.createdAt)}</span>
      </p>
      {isHovering && (
        <div className="tooltip" data-tip="Usuń komentarz">
          {isCurrentUserAuthor && (
            <TrashIcon
              className="h-6 cursor-pointer text-error duration-100 hover:scale-95 active:scale-75"
              onClick={() => void handleDeleteComment()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
