import { TailSpin } from "react-loader-spinner";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useRef, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { api } from "~/utils/api";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import { ListOfUsersToTag } from "../TaggedUsers/ListOfUsersToTag";

export type TagUsersActionButtonProps = {
  taggedUsersIds: string[];
  onToggleUser: (id: string) => void;
};
export const TagUsersActionButton = (props: TagUsersActionButtonProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useOutsideClick<HTMLLabelElement>(() => setOpen(false), [buttonRef]);
  const { data: users, isLoading } = api.user.find.useQuery({ query, omitMe: true });

  return (
    <>
      <button className="btn-action btn-primary" onClick={() => setOpen(true)} ref={buttonRef}>
        <UserGroupIcon className="h-6" />
        Oznacz
      </button>
      <label
        htmlFor="users-list-modal"
        className={`modal cursor-pointer ${open ? "modal-open" : ""}`}
      >
        <label className="modal-box relative" ref={modalRef}>
          <h4 className="text-lg font-bold">Oznacz inne osoby</h4>
          <div className="relative mt-3">
            <input
              className="input-secondary input w-full pl-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="np. Adam Nowak"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4 h-6 text-slate-400" />
          </div>
          {!isLoading ? (
            <ListOfUsersToTag
              users={users}
              taggedUsersIds={props.taggedUsersIds}
              onToggleUser={props.onToggleUser}
            />
          ) : (
            <div className="flex justify-center py-5">
              <TailSpin height={35} color="#3b82f6" />
            </div>
          )}
        </label>
      </label>
    </>
  );
};
