import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useRef, useState } from "react";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import ListOfUsersToTagContainer from "./ListOfUsersToTagContainer";
import { Modal, ModalContent, ModalTitle, useModal } from "~/hooks/useModal";
import useDebounce from "~/hooks/useBebounce";
import { useInfiniteUsers } from "~/components/Post/hooks";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";

export const TagUsersButton = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const { open, modalProps, ref: modalRef } = useModal([openButtonRef]);
  const { users, fetchNextPage } = useInfiniteUsers({ query: debouncedQuery as string });

  useOnEndOffScroll(modalRef, () => void fetchNextPage(), { offsetBottom: 50 });

  return (
    <>
      <button className="btn-action btn-primary" onClick={open} ref={openButtonRef}>
        <UserGroupIcon className="h-6" />
        Oznacz
      </button>
      <Modal {...modalProps} className="h-[400px]">
        <ModalTitle>Oznacz inne osoby</ModalTitle>
        <ModalContent>
          <div className="relative">
            <input
              className="input-secondary input w-full pl-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="np. Adam Nowak"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4 h-6 text-slate-400" />
          </div>

          <ListOfUsersToTagContainer users={users} />
        </ModalContent>
      </Modal>
    </>
  );
};
