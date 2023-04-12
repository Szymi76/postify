import React from "react";

type HeaderProps = { children: React.ReactNode; show: boolean; toggleSidebar: () => void };
const Header = (props: HeaderProps) => {
  return (
    <div
      className={`flex w-full ${
        props.show ? "justify-start" : "justify-center"
      }  gap-2 border-b border-slate-200 p-3 hover:bg-slate-50`}
      onClick={void props.toggleSidebar()}
    >
      {props.children}
    </div>
  );
};

export default Header;
