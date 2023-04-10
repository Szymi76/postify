import { RefObject, forwardRef } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

type DropdownProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  className?: string;
};
export const Dropdown = forwardRef<HTMLElement[], DropdownProps>((props, triggerRef) => {
  const ref = useOutsideClick<HTMLDivElement>(props.onClose, [
    triggerRef as RefObject<HTMLElement>,
  ]);

  // console.log(triggerRef[0].);

  if (!props.show) return <></>;

  const className = props.className ?? "";

  return (
    <div ref={ref} className={`dropdown-secondary ${className}`}>
      {props.children}
    </div>
  );
});

type DropdownItemProps = { children: React.ReactNode; className?: string };
export const DropdownItem = (props: DropdownItemProps) => {
  const className = props.className ?? "";

  return (
    <div className="dropdown-secondary-item border-b-0">
      <div className={`dropdown-secondary-item-content ${className}`}>{props.children}</div>
    </div>
  );
};

Dropdown.displayName = "Dropdown";
