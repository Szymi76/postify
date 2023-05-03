import React from "react";
import { Button, type ButtonBaseProps } from "./Buttons";
import { Spinner } from "../Spinner";
import { useTheme } from "styled-components";

type ButtonProps = Omit<React.ComponentProps<"button">, "ref"> & ButtonBaseProps;

export type LoadingButtonProps = ButtonProps & { isLoading?: boolean; customSpinner?: JSX.Element };
export const LoadingButton = (props: LoadingButtonProps) => {
  const theme = useTheme();
  const { isLoading, children, customSpinner, ...buttonProps } = props;

  const LoadingSpinner = customSpinner ? (
    customSpinner
  ) : (
    <Spinner center={false} color={theme.palette.white} size="sm" />
  );

  return (
    <Button {...buttonProps}>
      {isLoading && LoadingSpinner}
      {children}
    </Button>
  );
};
