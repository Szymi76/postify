import Image from "next/image";
import React from "react";

type AvatarProps = {
  src?: string | null;
  placeholderText?: string | null;
  className?: string;
  size?: number | "small" | "medium" | "large";
};
const Avatar = (props: AvatarProps) => {
  let size = `${props.size ?? 48}`;
  if (size.includes("small")) size = "28";
  if (size.includes("medium")) size = "48";
  if (size.includes("large")) size = "85";

  const sizeStyles = { height: size, width: size };
  const className = props.className ?? "";
  const placeholderText = props.placeholderText?.substring(0, 2);

  if (props.src) {
    return (
      <div className={`avatar`}>
        <div
          className={`rounded-full bg-slate-200 ${className}`}
          style={{ height: size + "px", width: size + "px" }}
        >
          <Image
            src={props.src ?? undefined}
            alt="awatar użytkownika"
            width={+size}
            height={+size}
            style={{}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`placeholder avatar`}>
      <div
        className={`rounded-full bg-slate-200 ${className}`}
        style={{ height: size + "px", width: size + "px" }}
      >
        <span className="text-xl">{placeholderText}</span>
      </div>
    </div>
  );
};

export default Avatar;
