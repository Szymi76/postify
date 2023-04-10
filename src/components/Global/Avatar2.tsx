import React from "react";

type Avatar2Props = {
  src?: string | null;
  placeholderText?: string | null;
  className?: string;
  size?: number;
};
const Avatar2 = (props: Avatar2Props) => {
  const size = `${props.size ?? 20}px`;
  const sizeStyles = { height: size, width: size };
  const className = props.className ?? "";
  const placeholderText = props.placeholderText?.substring(0, 2);

  if (props.src) {
    return (
      <div className={`avatar`}>
        <div className={`rounded-full bg-slate-200 ${className}`} style={sizeStyles}>
          <img src={props.src} />
        </div>
      </div>
    );
  }

  return (
    <div className={`placeholder avatar`}>
      <div className={`rounded-full bg-slate-200 ${className}`} style={sizeStyles}>
        <span className="text-xl">{placeholderText}</span>
      </div>
    </div>
  );
};

export default Avatar2;
