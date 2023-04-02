import React from "react";

export type AvatarProps = { src?: string | null; text?: string | null; size?: string };
export const Avatar = (props: AvatarProps) => {
  const sizeClassNames = props.size ? `w-${props.size} h-${props.size}` : "w-12 h-12";

  if (props.src) {
    return (
      <div className="avatar">
        <div className={`${sizeClassNames} rounded-full bg-slate-200`}>
          <img src={props.src} />
        </div>
      </div>
    );
  }

  return (
    <div className="placeholder avatar">
      <div className={`${sizeClassNames} rounded-full bg-slate-200`}>
        <span className="text-xl">{props.text}</span>
      </div>
    </div>
  );
};

export default Avatar;
