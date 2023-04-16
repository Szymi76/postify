import { TailSpin } from "react-loader-spinner";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useRef, useState } from "react";
import { api } from "~/utils/api";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import { ListOfUsersToTag } from "../TaggedUsers/ListOfUsersToTag";
import { Modal, ModalContent, ModalTitle, useModal } from "~/hooks/useModal";
import useDebounce from "~/hooks/useBebounce";

export type TagUsersActionButtonProps = {
  taggedUsersIds: string[];
  onToggleUser: (id: string) => void;
};
export const TagUsersActionButton = (props: TagUsersActionButtonProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const { open, modalProps } = useModal([openButtonRef]);
  const { data, fetchNextPage, isLoading } = api.user.getInfiniteUsers.useInfiniteQuery(
    {
      limit: 4,
      query: debouncedQuery as string,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const users = data?.pages.map((page) => page.items.map((item) => item)).flat() ?? [];

  const handleScroll = (e: React.UIEvent<HTMLLabelElement, UIEvent>) => {
    const isScrollAtEnd =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop == e.currentTarget.clientHeight;
    if (isScrollAtEnd) void fetchNextPage();
  };

  return (
    <>
      <button className="btn-action btn-primary" onClick={open} ref={openButtonRef}>
        <UserGroupIcon className="h-6" />
        Oznacz
      </button>
      <Modal {...modalProps} className="h-[400px]" onScroll={handleScroll}>
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
          {!isLoading ? (
            <>
              <ListOfUsersToTag
                users={users}
                taggedUsersIds={props.taggedUsersIds}
                onToggleUser={props.onToggleUser}
              />
            </>
          ) : (
            <div className="flex justify-center py-5">
              <TailSpin height={35} color="#3b82f6" />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
