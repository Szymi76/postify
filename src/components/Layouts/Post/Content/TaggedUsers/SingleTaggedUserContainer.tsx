import { type User } from "@prisma/client";
import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { useFloatingElement } from "~/hooks";
import Link from "next/link";
import { ActionText, Box, Flex, Paragraph } from "~/components/Shared";
import styled from "styled-components";

type SingleTaggedUserContainerProps = { user: User; isLastInList: boolean };
const SingleTaggedUserContainer = (props: SingleTaggedUserContainerProps) => {
  const [show, setShow] = useState(false);

  const [triggerRef, elementRef] = useFloatingElement(isHovering => setShow(isHovering));

  return (
    <Flex style={{ position: "relative" }}>
      <NameAsLink ref={triggerRef} href={`/profile/${props.user.id}`}>
        {props.user.name}
      </NameAsLink>
      <UserDetailsWrapper ref={elementRef}>
        {show && <UserDetails user={props.user} />}
      </UserDetailsWrapper>
      {!props.isLastInList && <Paragraph>•</Paragraph>}
    </Flex>
  );
};

export default SingleTaggedUserContainer;

const UserDetailsWrapper = styled(Box)`
  position: absolute;
  top: 24px;
  z-index: 10;
`;

const NameAsLink = styled(Link)`
  color: ${props => props.theme.palette.primary};
  :hover {
    text-decoration: underline;
  }
  padding: 0px ${props => props.theme.spacing.sm};
`;
