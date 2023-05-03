import { useRef, useState } from "react";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import ListOfUsersToTagContainer from "./ListOfUsersToTagContainer";
import { useModal } from "~/hooks";
import * as Modal from "~/components/Utils/Modal";
import { useDebounce } from "~/hooks/";
import { useInfiniteUsers } from "~/hooks/useInfiniteQueryHelpers";
import { useOnEndOffScroll } from "~/hooks/useOnEndOffScroll";
import { Button, Description, SearchTextInput } from "~/components/Shared";

export const TagUsersButton = () => {
  const [query, setQuery] = useState("");
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const { open, ref: modalRef, close, show } = useModal([openButtonRef]);
  const { users, fetchNextPage } = useInfiniteUsers({
    query: useDebounce(query, 300) as string,
  });

  useOnEndOffScroll(modalRef, () => void fetchNextPage(), { offsetBottom: 50 });

  return (
    <>
      <Button variant="outlined" onClick={open} ref={openButtonRef}>
        <UserGroupIcon />
        Oznacz
      </Button>
      {show && (
        <Modal.Wrapper>
          <Modal.Box onClose={close}>
            <Modal.Title>Oznacz inne osoby</Modal.Title>
            <Modal.Content>
              <SearchTextInput
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="np. Adam Nowak"
                style={{ width: "100%", marginBottom: 12 }}
              />

              <ListOfUsersToTagContainer users={users} />
              {query && users.length == 0 && (
                <Description>Nie znaleziono takiego użytkownika</Description>
              )}
            </Modal.Content>
          </Modal.Box>
        </Modal.Wrapper>
      )}
    </>
  );
};
