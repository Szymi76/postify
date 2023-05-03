import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import Link from "next/link";
import React from "react";
import PostifyLogo from "../../../public/logo_512x512_primary.png";
import { type PageLayout } from "~/layouts/PageLayoutHandler";
import { Box, Description, Flex, Headline, Icon, Paper, Tooltip } from "~/components/Shared";
import { pages } from "~/constants";
import styled from "styled-components";
import Image from "next/image";

const VerifyRequestPage = () => {
  return (
    <Flex justify="center" items="center" style={{ height: "100%" }}>
      <StyledPaper>
        <Link href={pages.home}>
          <Image src={PostifyLogo.src} height={80} width={80} alt="Logo postify" />
        </Link>
        <Headline size="2xl">Sprawdź swój email</Headline>
        <Description>Link z logowaniem został wysłany na twoją skrzynkę pocztową.</Description>
        <Absolute alignIcon="top-left">
          <Tooltip id="SignInPage-1" content="Wróć do logowania">
            <Link href={pages.signin}>
              <Icon>
                <ArrowLongLeftIcon />
              </Icon>
            </Link>
          </Tooltip>
        </Absolute>

        <Absolute alignIcon="top-right">
          <Tooltip
            id="SignInPage-2"
            content="Jeśli email nie dojedzie do ciebie w ciągu kilku minut, cofnij do strony logowania i spróbuj zalogować się ponownie."
          >
            <Link href={pages.home}>
              <Icon>
                <QuestionMarkCircleIcon />
              </Icon>
            </Link>
          </Tooltip>
        </Absolute>
      </StyledPaper>
    </Flex>
  );
};

const pageLayout: PageLayout = {
  auth: "only-unauthenticated",
  header: false,
};

VerifyRequestPage.pageLayout = pageLayout;
export default VerifyRequestPage;

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  width: 475px;
  max-width: 90%;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
`;

type AbsoluteProps = { alignIcon: "top-left" | "top-right" };
const Absolute = styled(Box)<AbsoluteProps>`
  position: absolute;
  top: 8px;
  left: ${props => props.alignIcon == "top-left" && 8}px;
  right: ${props => props.alignIcon == "top-right" && 8}px;
`;
