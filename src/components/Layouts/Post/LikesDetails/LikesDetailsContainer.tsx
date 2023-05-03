import React, { useRef } from "react";
import { pages } from "~/constants";
import { usePostContext } from "../PostContext";

import { Avatar, Box, Flex, Icon, Tooltip } from "~/components/Shared";
import LikesTextInfo from "./LikesTextInfo";
import Link from "next/link";
import { useGlobalModals } from "~/providers/GlobalModalsProvider/useGlobalModals";

const LikesDetailsContainer = () => {
  const { post } = usePostContext();
  const { setId } = useGlobalModals(state => state.postLikesModal);
  const modalTriggerRef = useRef<HTMLDivElement>(null);

  const users = post.likes.map(user => user.user);
  const limitedUsers = users.slice(0, 2);
  const extraLikesCount = users.length - limitedUsers.length;

  const openLikesModal = () => setId(post.id);

  return (
    <Flex items="center">
      <Flex style={{ marginLeft: post.likes.length > 0 ? 12 : 0 }}>
        {limitedUsers.map(user => (
          <Link key={user.id} href={pages.profile(user.id)} style={{ marginLeft: -12 }}>
            <Icon>
              <Avatar src={user.image} placeholderText={user.name} size={30} />
            </Icon>
          </Link>
        ))}

        {extraLikesCount > 0 && (
          <Tooltip id="LikesDetailsContainer" content="Pokaż więcej osób">
            <Box ref={modalTriggerRef} onClick={openLikesModal} style={{ marginLeft: -12 }}>
              <Icon>
                <Avatar placeholderText={`+${extraLikesCount}`} size={30} />
              </Icon>
            </Box>
          </Tooltip>
        )}
      </Flex>

      <Box style={{ marginLeft: post.likes.length > 0 ? 8 : 0 }}>
        <LikesTextInfo likesCount={users.length} />
      </Box>
    </Flex>
  );
};

export default LikesDetailsContainer;
