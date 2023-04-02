import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";

export type ErrorAlertProps = { error: string };
export const ErrorAlert = (props: ErrorAlertProps) => {
  let message = "Nie udało się zalogować. Jeśli błąd się powtórzy to poczekaj kilka minut.";
  if (props.error == "OAuthAccountNotLinked") message = "Konto z takim adresem email już istnieje.";
  else if (props.error == "EmailSignin") message = "Podany adres email jest nieprawidłowy.";

  return (
    <div className="alert alert-error mb-5">
      <div>
        <XCircleIcon className="h-10 w-10" />
        <span>{message}</span>
      </div>
    </div>
  );
};
