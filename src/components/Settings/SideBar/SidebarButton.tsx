import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type SidebarButtonProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  showOnlyIcon: boolean;
  active: boolean;
};
const SidebarButton = (props: SidebarButtonProps) => {
  return (
    <Link
      href={props.href}
      className={`flex h-[100px] w-full cursor-pointer ${
        props.showOnlyIcon ? "justify-center" : "justify-start"
      } gap-2 border-b ${
        props.active ? "bg-primary text-white hover:bg-blue-600" : "hover:bg-gray-50"
      } duration-100] border-slate-200 p-3 text-gray-600 duration-100`}
    >
      <div className={`flex ${props.showOnlyIcon ? "items-center" : "items-start"}`}>
        {props.icon}
      </div>
      {!props.showOnlyIcon && (
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <p
            className={`overflow-hidden text-sm ${
              props.active ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {props.description}
          </p>
        </div>
      )}
    </Link>
  );
};

export default SidebarButton;
