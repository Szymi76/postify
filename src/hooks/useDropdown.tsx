import { DetailedHTMLProps, HTMLAttributes, RefObject, forwardRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

export const useDropdown = (triggers?: RefObject<HTMLElement>[]) => {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);
  const open = () => setShow(true);
  const toggle = () => setShow(!show);

  const ref = useOutsideClick<HTMLDivElement>(() => close(), triggers);

  const dropdownProps = {
    show,
    onClose: close,
    ref,
  };

  return { show, open, close, toggle, dropdownProps, ref } as const;
};

export type DropdownProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  className?: string;
  anchor?: "left" | "right";
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  if (!props.show) return <></>;

  const className = props.className ?? "";
  const anchor = props.anchor ?? "left";

  return (
    <div ref={ref} className={`dropdown-secondary dropdown-secondary-${anchor} ${className} `}>
      {props.children}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type DropdownItemProps = HTMLDivProps & { contentClassName?: string };
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>((props, ref) => {
  const { contentClassName, className, ...dropdownItemProps } = props;

  return (
    <div ref={ref} className={`dropdown-secondary-item ${className ?? ""}`} {...dropdownItemProps}>
      <div
        className={`dropdown-secondary-item-content whitespace-nowrap text-sm font-medium ${
          contentClassName ?? ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
});

DropdownItem.displayName = "DropdownItem";
