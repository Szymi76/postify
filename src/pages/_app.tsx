/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { CompleteTheConfiguration } from "~/layouts/CompleteTheConfigurations";
import AlertWrapper from "~/layouts/AlertWrapper";
import ComponentRequiredPropsHandler from "~/layouts/ComponentRequiredPropsHandler";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CompleteTheConfiguration>
        <AlertWrapper>
          <ComponentRequiredPropsHandler pageProps={pageProps} Component={Component} />
        </AlertWrapper>
      </CompleteTheConfiguration>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
