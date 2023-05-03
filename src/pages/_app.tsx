import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";

import { theme } from "~/styles/theme";
import {
  RootLayout,
  AwaitForAuthLayout,
  PageLayoutHandler,
  CompleteRequiredUserData,
} from "../layouts";

import GlobalModalsProvider from "~/providers/GlobalModalsProvider/GlobalModalsProvider";
import AlertsProvider from "~/providers/AlertsProvider/AlertsProvider";
import CustomThemeProvider from "~/providers/CustomThemeProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CustomThemeProvider>
        <AwaitForAuthLayout>
          <RootLayout>
            <CompleteRequiredUserData>
              <PageLayoutHandler pageProps={pageProps} Component={Component} />
            </CompleteRequiredUserData>
            <GlobalModalsProvider />
            <AlertsProvider />
          </RootLayout>
        </AwaitForAuthLayout>
      </CustomThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
