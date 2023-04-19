import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

type UserCardProps = {
  name?: string | null;
  avatarUrl?: string | null;
  secondaryText?: string | null;
  nameStyles?: {
    position?: "center" | "start";
    size?: "md" | "lg";
    fontWeight?: "normal" | "large";
  };
  avatarStyles?: { size?: "small" | "medium" };
  className?: string;
  secondaryTextStyles?: { fontWeight?: "normal" | "large" };
};
const UserCard = (props: UserCardProps) => {
  const { className, avatarStyles, secondaryTextStyles } = props;
  const name = props.name ?? undefined;
  const avatarUrl = props.avatarUrl ?? undefined;
  const secondaryText = props.secondaryText ?? undefined;
  const namePosition = props?.nameStyles?.position ?? "center";
  const justifyItems = namePosition == "center" ? "justify-center" : "justify-start";
  const nameSize = props.nameStyles?.size ?? "lg";
  const textSize = nameSize == "lg" ? "text-lg" : "text-md";
  const secondaryTextFontWeightStyle = secondaryTextStyles?.fontWeight ?? "normal";
  const secondaryTextFontWeight =
    secondaryTextFontWeightStyle == "normal" ? "font-medium" : "font-semibold";
  const nameTextFontWeightText = props.nameStyles?.fontWeight ?? "normal";
  const nameTextFontWeight = nameTextFontWeightText == "normal" ? "font-medium" : "font-semibold";

  return (
    <div className={`flex max-w-[100%] gap-3 ${className ?? ""}`}>
      <Avatar src={avatarUrl} placeholderText={name} size={avatarStyles?.size} />
      <div className={`flex flex-col overflow-hidden whitespace-nowrap ${justifyItems}`}>
        <h3
          className={`overflow-hidden text-ellipsis font-medium ${textSize} ${nameTextFontWeight}`}
          title={name}
        >
          {name}
        </h3>
        {secondaryText && (
          <p
            className={`overflow-hidden text-ellipsis text-sm text-gray-500 ${secondaryTextFontWeight}`}
            title={secondaryText}
          >
            {secondaryText}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
