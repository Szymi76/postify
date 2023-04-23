import React from "react";
import { LoadingButton } from "~/components/Global";
import { ModalFooter, ModalTitle, useModal } from "~/hooks/useModal";
import { api } from "~/utils/api";

type DeletePostModalContentProps = { postId: string; closeModal: () => void };
const DeletePostModalContent = (props: DeletePostModalContentProps) => {
  const { mutateAsync: deletePost, isLoading } = api.post.delete.useMutation();
  const utils = api.useContext();

  const handleDeletePost = async () => {
    await deletePost({ postId: props.postId });
    await utils.post.getPostById.refetch({ postId: props.postId });
  };

  return (
    <>
      <ModalTitle>Czy na pewno chcesz usunąć ten post?</ModalTitle>
      <ModalFooter>
        <button className="btn-secondary btn-sm btn" onClick={props.closeModal}>
          Cofnij
        </button>
        <LoadingButton
          loading={isLoading}
          className="btn-error btn-sm btn"
          onClick={() => void handleDeletePost()}
        >
          Usuń
        </LoadingButton>
      </ModalFooter>
    </>
  );
};

export default DeletePostModalContent;
