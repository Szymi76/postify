/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Protected } from "~/layouts/Protected";
import { CompleteTheConfiguration } from "~/layouts/CompleteTheConfigurations";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CompleteTheConfiguration>
        {/* @ts-ignore */}
        {Component.requireAuth ? (
          <Protected>
            <Component {...pageProps} />
          </Protected>
        ) : (
          <Component {...pageProps} />
        )}
      </CompleteTheConfiguration>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
