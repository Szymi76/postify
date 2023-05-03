import React from "react";
import { useGlobalModals } from "../useGlobalModals";
import * as Modal from "~/components/Utils/Modal";
import { Button, LoadingButton } from "~/components/Shared";
import { api } from "~/utils/api";

const DeletePostModal = () => {
  const { id, setId } = useGlobalModals(state => state.deletePostModal);
  const { mutateAsync: deletePost, isLoading } = api.post.delete.useMutation();
  const utils = api.useContext();

  const closeModal = () => setId(null);

  const handleDeletePost = async () => {
    await deletePost({ postId: id! });
    await utils.post.getPostById.refetch({ postId: id! });
    closeModal();
  };

  return (
    <Modal.Wrapper>
      <Modal.Box onClose={closeModal}>
        <Modal.Title>Czy na pewno chcesz usunąć ten post?</Modal.Title>
        <Modal.Content />
        <Modal.Footer>
          <Button color="secondary" onClick={closeModal}>
            Cofnij
          </Button>
          <LoadingButton
            isLoading={isLoading}
            onClick={() => void handleDeletePost()}
            color="error"
          >
            Usuń
          </LoadingButton>
        </Modal.Footer>
      </Modal.Box>
    </Modal.Wrapper>
  );
};

export default DeletePostModal;
