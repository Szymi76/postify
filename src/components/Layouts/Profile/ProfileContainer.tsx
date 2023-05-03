import React, { useRef } from "react";
import Images from "./Images";
import { api } from "~/utils/api";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { useSession } from "next-auth/react";
import { useDropdown } from "~/hooks/useDropdown";
import * as Dropdown from "~/components/Utils/Dropdown";
import ProfileContainerSkeleton from "./ProfileContainerSkeleton";
import Link from "next/link";
import { pages } from "~/constants";
import { Box, Description, Flex, Headline, Icon, Paper } from "~/components/Shared";
import styled from "styled-components";
import FriendshipButton from "./ActionButtons/Buttons/FriendshipButton";

type ProfileContainerProps = { userId: string };
const ProfileContainer = (props: ProfileContainerProps) => {
  const { data, isLoading } = api.user.getByIds.useQuery({ ids: [props.userId] });
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const { toggle: toggleDropdown, dropdownProps } = useDropdown([dropdownTriggerRef]);
  const currentUser = useSession().data?.user;

  const user = data && data.length == 1 ? data[0]! : null;
  const isItCurrentUserProfileContainer = Boolean(user?.id == currentUser?.id && currentUser?.id);

  if (isLoading) return <ProfileContainerSkeleton />;
  if (!isLoading && !user) return <h1>Profil nie istnieje!!!</h1>;

  return (
    <Paper>
      <Images user={user!} />
      <ProfileContainerDetailsWrapper>
        <Headline>{user?.name}</Headline>
        <Description>{user?.description}</Description>
        <ActionButtonsWrapper>
          <FriendshipButton userId={props.userId} />
        </ActionButtonsWrapper>
        <DropdownTriggerWrapper>
          <Box style={{ position: "relative" }}>
            <Icon ref={dropdownTriggerRef} onClick={toggleDropdown}>
              <EllipsisHorizontalIcon height={28} width={28} />
            </Icon>
            <Dropdown.Wrapper {...dropdownProps}>
              {isItCurrentUserProfileContainer && (
                <Dropdown.Item>
                  <Link href={pages.settings.account}>Zaktualizuj profil</Link>
                </Dropdown.Item>
              )}
            </Dropdown.Wrapper>
          </Box>
        </DropdownTriggerWrapper>
      </ProfileContainerDetailsWrapper>
    </Paper>
  );
};

export default ProfileContainer;

const ProfileContainerDetailsWrapper = styled(Box)`
  position: relative;
  padding-top: 50px;
`;

const DropdownTriggerWrapper = styled(Box)`
  position: absolute;
  top: 12px;
  right: 8px;
`;

const ActionButtonsWrapper = styled(Box)`
  display: flex;
  padding-top: ${props => props.theme.spacing.lg};
`;
