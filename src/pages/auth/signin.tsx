import React from "react";
import Link from "next/link";

import PostifyLogo from "../../../public/logo_512x512_primary.png";
import GoogleLogo from "../../../public/icon_google.png";
import GithubLogo from "../../../public/icon_github.png";
import DiscordLogo from "../../../public/icon_discord.png";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";

import { useRouter } from "next/router";
import { ErrorAlert } from "~/components/Layouts/Auth/ErrorAlert";
import { ProviderButton } from "~/components/Layouts/Auth/Providers/ProviderButton";
import { EmailProvider } from "~/components/Layouts/Auth/Providers/EmailProvider";
import styled from "styled-components";
import { Box, Description, Flex, Headline, Icon, Paper, Tooltip } from "~/components/Shared";
import { type PageLayout } from "~/layouts/PageLayoutHandler";
import Image from "next/image";
import { pages } from "~/constants";

const SignInPage = () => {
  const { query } = useRouter();
  const error = query.error as string | undefined;

  return (
    <Flex justify="center" items="center" style={{ height: "100%" }}>
      <StyledPaper>
        <Link href={pages.home}>
          <Image src={PostifyLogo.src} height={80} width={80} alt="Logo postify" />
        </Link>

        <Headline size="3xl">Zaloguj się</Headline>

        <ProvidersWrapper>
          {error && <ErrorAlert error={error} />}
          <ProviderButton provider="google" src={GoogleLogo.src} />
          <ProviderButton
            provider="github"
            customImage={
              <GithubCustomImage src={GithubLogo.src} height={40} width={40} alt="github logo" />
            }
          />
          <ProviderButton provider="discord" src={DiscordLogo.src} />
          <Devider>LUB</Devider>
          <EmailProvider />
          <Description>
            Kliknięcie przycisku powyżej spowoduje wysłanie do twojej skrzynki wiadomości z
            logowaniem.
          </Description>
        </ProvidersWrapper>

        <Absolute alignIcon="top-left">
          <Tooltip id="SignInPage-1" content="Wróć do strony głównej">
            <Link href={pages.home}>
              <Icon>
                <ArrowLongLeftIcon />
              </Icon>
            </Link>
          </Tooltip>
        </Absolute>

        <Absolute alignIcon="top-right">
          <Tooltip
            id="SignInPage-2"
            content="Ze względów bezpieczeńswa nie przechowywujemy twoich haseł. Logowanie może odbywać się za pomocą pośrednika lub własnego adresu email"
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
SignInPage.pageLayout = pageLayout;
export default SignInPage;

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  min-height: 70vh;
  width: 475px;
  max-width: 90%;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
`;

const ProvidersWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${props => props.theme.spacing.md};
  margin-top: 24px;
`;

const Devider = styled(Box)`
  width: 100%;
  text-align: center;
  position: relative;
  ::after {
    content: "";
    position: absolute;
    display: block;
    height: 1px;
    width: 42%;
    background-color: ${props => props.theme.palette.gray[200]};
    top: 50%;
  }
  ::before {
    content: "";
    position: absolute;
    display: block;
    height: 1px;
    width: 42%;
    background-color: ${props => props.theme.palette.gray[200]};
    top: 50%;
    right: 0;
  }
`;

type AbsoluteProps = { alignIcon: "top-left" | "top-right" };
const Absolute = styled(Box)<AbsoluteProps>`
  position: absolute;
  top: 8px;
  left: ${props => props.alignIcon == "top-left" && 8}px;
  right: ${props => props.alignIcon == "top-right" && 8}px;
`;

const GithubCustomImage = styled(Image)`
  background-color: white;
  border-radius: 9999px;
`;
