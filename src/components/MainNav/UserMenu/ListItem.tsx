import React from "react";

export type ListItemProps = { children: React.ReactNode; onClick?: () => void };
export const ListItem = (props: ListItemProps) => {
  return (
    <li
      className="flex cursor-pointer items-center gap-4 py-2 px-4 duration-100 hover:bg-slate-50 active:bg-slate-100"
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};

export default ListItem;
