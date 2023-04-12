import { NextComponentType, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Header from "~/components/Header";
import { HEADER_HEIGHT, PAGES, PAGE_PADDING_TOP_CLASS_NAME_WITH_HEADER } from "~/constants";

export type PageComponentRequiredProps = {
  header?: "include";
  footer?: "include";
  auth?: "for-all" | "only-authenticated" | "only-unauthenticated";
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
  const includeFooter = Boolean(requiredPageProps?.footer);

  const redirectCurrentUserToSigninPage =
    auth == "only-authenticated" && status == "unauthenticated";
  const redirectCurrentUserToHomePage = auth == "only-unauthenticated" && status == "authenticated";

  useEffect(() => {
    if (redirectCurrentUserToSigninPage) void router.push(PAGES.SINGIN);
    if (redirectCurrentUserToHomePage) void router.push(PAGES.HOME);
  }, [status]);

  if (status == "loading") return <LoadingPage />;
  if (redirectCurrentUserToHomePage || redirectCurrentUserToSigninPage) return <LoadingPage />;

  const paddingTop = includeHeader ? PAGE_PADDING_TOP_CLASS_NAME_WITH_HEADER : "pt-0";

  return (
    <div className={`${paddingTop} bg-slate-100`}>
      {includeHeader && <Header />}
      <Component {...props.pageProps} />
      {/* {includeFooter && <h1>Footer</h1>} */}
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
