import React from "react";
import { Modal, ModalTitle, ModalFooter } from "../../../hooks/useSetupModal";
import { useGlobalModals } from "~/store/useGlobalModals";
import { LoadingButton } from "~/components/Global";
import { api } from "~/utils/api";

const DeletePostModal = () => {
  const { id, setId } = useGlobalModals((state) => state.deletePostModal);
  const { mutateAsync: deletePost, isLoading } = api.post.delete.useMutation();
  const utils = api.useContext();

  if (!id) return <></>;

  const closeModal = () => setId(null);

  const handleDeletePost = async () => {
    await deletePost({ postId: id });
    await utils.post.getPostById.refetch({ postId: id });
    closeModal();
  };

  return (
    <Modal onClose={closeModal}>
      <ModalTitle>Czy na pewno chcesz usunąć ten post?</ModalTitle>
      <ModalFooter>
        <button className="btn-secondary btn-sm btn" onClick={closeModal}>
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
    </Modal>
  );
};

export default DeletePostModal;
