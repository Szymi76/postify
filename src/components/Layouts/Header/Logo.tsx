import Link from "next/link";
import React from "react";

import GlobeAltIcon from "@heroicons/react/24/outline/GlobeAltIcon";
import { Flex, Headline } from "~/components/Shared";
import { pages } from "~/constants";
import styled, { useTheme } from "styled-components";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link href={pages.home}>
      <Flex items="center" gap="sm">
        <GlobeAltIcon height={35} width={35} color={theme.palette.white} />
        <Brand>Postify</Brand>
      </Flex>
    </Link>
  );
};

export default Logo;

const Brand = styled(Headline)`
  color: ${props => props.theme.palette.white};
  font-size: ${props => props.theme.font.size["2xl"]};
`;
