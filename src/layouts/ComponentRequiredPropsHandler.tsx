import { NextComponentType, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import BottomNavigation from "~/components/BottomNavigation";
import Header from "~/components/Header";
import { HEADER_HEIGHT, PAGES, PAGE_PADDING_TOP_CLASS_NAME_WITH_HEADER } from "~/constants";

export type PageComponentRequiredProps = {
  header?: "include";
  auth?: "for-all" | "only-authenticated" | "only-unauthenticated";
  bottomNavigation?: "not-include";
  id?: string;
};

type ComponentRequiredPropsHandlerProps = {
  pageProps: object;
  Component: NextComponentType<NextPageContext, any, any> & {
    requiredPageProps?: PageComponentRequiredProps;
  };
};
const ComponentRequiredPropsHandler = (props: ComponentRequiredPropsHandlerProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const Component = props.Component;
  const requiredPageProps = Component?.requiredPageProps;

  const auth = requiredPageProps?.auth ?? "for-all";
  const includeHeader = Boolean(requiredPageProps?.header);
  const includeBottomNav = !Boolean(requiredPageProps?.bottomNavigation);
  const id = requiredPageProps?.id ?? undefined;

  const redirectCurrentUserToSigninPage =
    auth == "only-authenticated" && status == "unauthenticated";
  const redirectCurrentUserToHomePage = auth == "only-unauthenticated" && status == "authenticated";

  useEffect(() => {
    if (redirectCurrentUserToSigninPage) void router.push(PAGES.SINGIN);
    if (redirectCurrentUserToHomePage) void router.push(PAGES.HOME);
  }, [status]);

  if (status == "loading") return <LoadingPage />;
  if (redirectCurrentUserToHomePage || redirectCurrentUserToSigninPage) return <LoadingPage />;

  const Y_PADDING = 40;
  const paddingTop = includeHeader ? `${HEADER_HEIGHT + Y_PADDING}px` : "0px";
  const paddingBottom = `${Y_PADDING}px`;
  // const height = includeHeader ? `calc(100vh - ${HEADER_HEIGHT}px)` : "100vh";

  return (
    <div
      id={id}
      className="h-screen overflow-hidden bg-slate-100"
      // style={{ paddingTop, paddingBottom }}
    >
      {includeHeader && <Header />}
      <Component {...props.pageProps} />
      {/* {includeBottomNav && <BottomNavigation />} */}
    </div>
  );
};

export default ComponentRequiredPropsHandler;

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen justify-center bg-slate-100 pt-20">
      <TailSpin height={50} color="#3b82f6" />
    </div>
  );
};
