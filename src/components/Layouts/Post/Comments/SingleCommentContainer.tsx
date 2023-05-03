import { type Comment, type User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useHover } from "~/hooks";
import { timeFromNow } from "~/utils/other";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { pages } from "~/constants";
import { useAlert } from "~/providers/AlertsProvider/useAlert";
import styled from "styled-components";
import { Box, Description, Flex, Icon, Name, Paragraph, Tooltip } from "~/components/Shared";

type SingleCommentContainerProps = { comment: Comment & { author: User } };
const SingleCommentContainer = (props: SingleCommentContainerProps) => {
  const currentUser = useSession().data?.user;
  const pushAlert = useAlert(state => state.pushAlert);
  const [ref, isHovering] = useHover<HTMLDivElement>();
  const { mutateAsync: deleteComment } = api.comment.delete.useMutation();
  const utils = api.useContext();

  const isCurrentUserAuthor = Boolean(props.comment.author.id == currentUser?.id && currentUser.id);

  const handleDeleteComment = async () => {
    await deleteComment({ commentId: props.comment.id });
    await utils.comment.getInfiniteComments.refetch({ postId: props.comment.postId, limit: 5 });
    pushAlert({ text: "Komentarz został usunięty", type: "primary" });
  };

  return (
    <SingleCommentContainerWrapper ref={ref}>
      <Flex items="center">
        <Link href={pages.profile(props.comment.author.id)}>
          <Name style={{ marginRight: 8 }}>{props.comment.author.name}</Name>
        </Link>
        {props.comment.text}
        <Description style={{ marginLeft: 8 }}>{timeFromNow(props.comment.createdAt)}</Description>
      </Flex>
      {isHovering && (
        <Tooltip id="SingleCommentContainer" content="Usuń komentarz">
          {isCurrentUserAuthor && (
            <Icon onClick={() => void handleDeleteComment()}>
              <StyledTrashIcon />
            </Icon>
          )}
        </Tooltip>
      )}
    </SingleCommentContainerWrapper>
  );
};

export default SingleCommentContainer;

const SingleCommentContainerWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
`;

const StyledTrashIcon = styled(TrashIcon)`
  color: ${props => props.theme.palette.error};
  height: 24px;
  width: 24px;
`;
