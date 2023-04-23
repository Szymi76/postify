/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { CompleteTheConfiguration } from "~/layouts/CompleteTheConfigurations";
import ComponentRequiredPropsHandler from "~/layouts/ComponentRequiredPropsHandler";

import AlertsProvider from "~/providers/AlertsProvider";
import GlobalModalsProvider from "~/providers/GlobalModalsProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CompleteTheConfiguration>
        <GlobalModalsProvider>
          <AlertsProvider>
            <ComponentRequiredPropsHandler pageProps={pageProps} Component={Component} />
          </AlertsProvider>
        </GlobalModalsProvider>
      </CompleteTheConfiguration>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
