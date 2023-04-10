import { User } from "@prisma/client";
import React from "react";
import { Avatar2 } from "../Global";

type ImagesProps = { user: User };
const Images = (props: ImagesProps) => {
  const bgImageUrl = props.user.backgroundImage;

  return (
    <div className="relative h-[225px] w-full bg-gray-200">
      {bgImageUrl && <img src={bgImageUrl} className="h-[225px] w-full object-cover" />}
      <div className="absolute -bottom-[56px] left-[28px]">
        <Avatar2
          src={props.user.image}
          placeholderText={props.user.name}
          size={112}
          className="border-4 border-white"
        />
      </div>
    </div>
  );
};

export default Images;
