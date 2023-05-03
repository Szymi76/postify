import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import styled from "styled-components";
import { Box, Name } from "~/components/Shared";

export type ErrorAlertProps = { error: string };
export const ErrorAlert = (props: ErrorAlertProps) => {
  let message = "Nie udało się zalogować. Jeśli błąd się powtórzy to poczekaj kilka minut.";
  if (props.error == "OAuthAccountNotLinked") message = "Konto z takim adresem email już istnieje.";
  else if (props.error == "EmailSignin") message = "Podany adres email jest nieprawidłowy.";

  return (
    <ErrorAlertWrapper>
      <XCircleIcon height={40} width={40} />
      <Name>{message}</Name>
    </ErrorAlertWrapper>
  );
};

const ErrorAlertWrapper = styled(Box)`
  background-color: ${props => props.theme.palette.error};
  color: ${props => props.theme.palette.white};
  border-radius: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;
