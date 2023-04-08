import { useSession } from "next-auth/react";
import React, { RefObject, forwardRef, useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { RouterOutputs, api } from "~/utils/api";
import { LoadingButton, Modal } from "~/components/Global";
import AuthorLinkButton from "./Buttons/AuthorLinkButton";
import OpenDeleteModalButton from "./Buttons/OpenDeleteModalButton";

type DropdownProps = {
  show: boolean;
  onClose: () => void;
  refetch: () => void;
  post: RouterOutputs["post"]["getPostById"];
};
const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, triggerRef) => {
  const ref = useOutsideClick<HTMLDivElement>(props.onClose, [
    triggerRef as RefObject<HTMLElement>,
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currentUser = useSession().data?.user;
  const modalTriggerRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: deletePost, isLoading } = api.post.delete.useMutation();

  const isCurrentUserAuthor = Boolean(props.post?.author.id == currentUser?.id && currentUser?.id);

  if (!props.show) return <></>;

  const closeModal = () => setShowDeleteModal(false);
  const openModal = () => setShowDeleteModal(true);

  const handleDeletePost = async () => {
    await deletePost({ postId: props.post!.id });
    props.refetch();
  };

  return (
    <div ref={ref} className="dropdown-secondary dropdown-secondary-left">
      {/* PRZYCISK Z LINKIEM DO PROFILU AUTORA, JEŚLI AKTUALNIE ZALOGOWANY UŻYTKOWNIK NIE JEST AUTOREM*/}
      {!isCurrentUserAuthor && <AuthorLinkButton authorId={props.post!.author.id} />}

      {/* PRZYCISK DO OTWIERANIA MODALA DO USUWANIA POSTU, JEŚLI AKTUALNIE ZALOGOWANY UŻYTKOWNIK JEST AUTOREM*/}
      {isCurrentUserAuthor && <OpenDeleteModalButton ref={modalTriggerRef} onClick={openModal} />}

      {/* MODAL DO POTWIERDZANIA USUNIĘCIA POSTU */}
      <Modal ref={modalTriggerRef} open={showDeleteModal} onClose={closeModal}>
        <h2 className="text-lg font-medium">Czy na pewno chcesz usunąć ten post?</h2>
        <div className="mt-5 flex justify-end gap-1">
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
        </div>
      </Modal>
    </div>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;
