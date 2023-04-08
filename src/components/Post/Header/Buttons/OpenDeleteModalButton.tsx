import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { forwardRef } from "react";

type OpenDeleteModalButtonProps = { onClick: () => void };
const OpenDeleteModalButton = forwardRef<HTMLDivElement, OpenDeleteModalButtonProps>(
  (props, deleteModalTriggerRef) => {
    return (
      <div
        ref={deleteModalTriggerRef}
        className="dropdown-secondary-item border-b-0"
        onClick={props.onClick}
      >
        <div className="dropdown-secondary-item-content">
          <div className="flex items-center gap-1 text-error">
            <TrashIcon className="h-6" />
            <p className="whitespace-nowrap text-sm font-medium">Usuń post</p>
          </div>
        </div>
      </div>
    );
  }
);

OpenDeleteModalButton.displayName = "OpenDeleteModalButton";
export default OpenDeleteModalButton;
