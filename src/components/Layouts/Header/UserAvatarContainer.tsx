import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "~/hooks";
import { Avatar, Box } from "~/components/Shared/";
import PopoutMenu from "./PopoutMenu/PopoutMenuContainer";
import styled from "styled-components";

const UserAvatarContainer = () => {
  const currentUser = useSession().data!.user;
  const avatarRef = useRef<HTMLDivElement>(null);
  const popoutMenuRef = useOnClickOutside<HTMLDivElement>(() => setShow(false), [avatarRef]);
  const [show, setShow] = useState(false);

  return (
    <Box style={{ position: "relative" }}>
      <AvatarWrapper ref={avatarRef} onClick={() => setShow(!show)}>
        <Avatar src={currentUser.image} placeholderText={currentUser.name} />
      </AvatarWrapper>
      {show && <PopoutMenu ref={popoutMenuRef} user={currentUser} onClose={() => setShow(false)} />}
    </Box>
  );
};

export default UserAvatarContainer;

const AvatarWrapper = styled(Box)`
  transition-duration: 100ms;
  cursor: pointer;
  :hover {
    scale: 95%;
    filter: brightness(95%);
  }
  :active {
    scale: 90%;
  }
`;
