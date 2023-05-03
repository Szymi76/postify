import { useSession } from "next-auth/react";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Spinner } from "~/components/Shared";

type AwaitForAuthLayoutProps = { children: React.ReactNode };

/**
 * Layout pokazujący się w momencie gdy nie wiadomo czy użytkownik
 * (nie) jest zalogowany.
 */
export const AwaitForAuthLayout = (props: AwaitForAuthLayoutProps) => {
  const theme = useTheme();
  const { status } = useSession();

  if (status != "loading") return <>{props.children}</>;

  return (
    <AwaitForAuthLayoutWrapper
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.gray[50],
        paddingTop: 100,
      }}
    >
      <Spinner size="lg" center />
    </AwaitForAuthLayoutWrapper>
  );
};

/**
 * BŁĄD - next js nie ładuje stylow do styled components gdy sessja się ładuje lub jest pierwsze ładowanie
 */

const AwaitForAuthLayoutWrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.palette.gray[50]};
`;
