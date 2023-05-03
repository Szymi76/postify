import { type NextComponentType, type NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "~/components/Layouts/Header/HeaderContainer";
import { ConditionalWrapper } from "~/components/Shared";
import { pages } from "~/constants";

type ComponentType = NextComponentType<NextPageContext, any, any>;

export type PageLayout = {
  auth?: "for-all" | "only-authenticated" | "only-unauthenticated";
  header?: boolean;
  scrollable?: boolean;
};

type PageLayoutHandlerProps = {
  pageProps: object;
  Component: ComponentType & { pageLayout?: PageLayout };
};

/**
 * Layout powoduje, że gdy zostanie dodany objekt typu `PageLayout` do propsów
 * strony to na tej podstawie jest wyświetlany np. `Header`. Odpowiada on również
 * za to czy strona ma być tylko dla zalogowanych itp.
 */
export const PageLayoutHandler = (props: PageLayoutHandlerProps) => {
  const { Component } = props;
  const { status } = useSession();
  const router = useRouter();

  const isUserLoggedIn = status === "authenticated";
  const includeHeader = Component.pageLayout?.header === false ? false : true;
  const isScrollable = Component.pageLayout?.scrollable === false ? false : true;
  const pageAuth = Component.pageLayout?.auth ?? "for-all";

  useEffect(() => {
    // jeśli strona ma być tylko dla zalogowanych, a użytkownik nie jest zalogowany to
    // przekierować go do strony z logowaniem
    if (pageAuth == "only-authenticated" && !isUserLoggedIn) {
      void router.replace(pages.signin);
    }

    // jeśli strona jest tylko dla nie zalogowanych, a użytkownik jest zalogowany to
    // przekierować go do home page
    if (pageAuth == "only-unauthenticated" && isUserLoggedIn) {
      void router.replace(pages.home);
    }
  }, []);

  if (
    (pageAuth == "only-authenticated" && !isUserLoggedIn) ||
    (pageAuth == "only-unauthenticated" && isUserLoggedIn)
  )
    return <></>;

  return (
    <>
      {includeHeader && <Header />}
      <ConditionalWrapper
        condition={isScrollable}
        wrapper={children => (
          <ScrollableWrapper includeHeader={includeHeader}>{children}</ScrollableWrapper>
        )}
      >
        <Component {...props.pageProps} />
      </ConditionalWrapper>
    </>
  );
};

type ScrollableWrapperProps = { includeHeader?: boolean };
export const ScrollableWrapper = styled.div<ScrollableWrapperProps>(props => ({
  height: `calc(100vh - ${props.includeHeader ? props.theme.layouts.header.height : 0}px)`,
  width: "100%",
  overflowY: "auto",
  position: "fixed",
  bottom: "0",
  paddingTop: props.includeHeader ? props.theme.spacing["2xl"] : 0,
  paddingBottom: props.includeHeader ? props.theme.spacing["2xl"] : 0,
}));
