import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { type AlertType } from "~/providers/AlertsProvider/useAlert";
import { type DefaultTheme } from "styled-components";

/**
 * Warianty przycisków
 */

export type SingleButtonVariantValue = {
  color: string;
  backgroundColor: string;
  borderColor: string;
  hover: {
    color: string;
    backgroundColor: string;
  };
};

export type ButtonVariantValue = {
  solid: SingleButtonVariantValue;
  outlined: SingleButtonVariantValue;
};
export type ButtonVariantKey = "primary" | "secondary" | "error";
export type ButtonVariants = Record<ButtonVariantKey, ButtonVariantValue>;

/**
 * Warianty pól tekstowych
 */

export type InputVariantValue = {
  borderColor: string;
  hover: {
    borderColor: string;
  };
};
export type InputVariantKey = "secondary";
export type InputVariants = Record<InputVariantKey, InputVariantValue>;

/**
 * Warianty alertów
 */

export type AlertVariantValue = {
  color: string;
  backgroundColor: string;
  icon: React.ReactNode;
};
export type AlertVariantKey = AlertType;
export type AlertVariants = Record<AlertVariantKey, AlertVariantValue>;

/**
 * Warianty
 */

export type Variants = {
  button: ButtonVariants;
  input: InputVariants;
  alert: AlertVariants;
};

export const createVariants = (theme: DefaultTheme): Variants => ({
  button: {
    primary: {
      solid: {
        color: theme.palette.white,
        backgroundColor: theme.palette.primary,
        borderColor: theme.palette.primary,
        hover: {
          color: theme.palette.white,
          backgroundColor: theme.palette.hover.primary,
        },
      },
      outlined: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
        borderColor: theme.palette.primary,
        hover: {
          color: theme.palette.white,
          backgroundColor: theme.palette.primary,
        },
      },
    },
    secondary: {
      solid: {
        color: theme.palette.black,
        backgroundColor: theme.palette.white,
        borderColor: theme.palette.gray[200],
        hover: {
          color: theme.palette.black,
          backgroundColor: theme.palette.gray[200],
        },
      },
      outlined: {
        color: theme.palette.black,
        backgroundColor: "transparent",
        borderColor: theme.palette.gray[200],
        hover: {
          color: theme.palette.black,
          backgroundColor: theme.palette.gray[200],
        },
      },
    },
    error: {
      solid: {
        color: theme.palette.black,
        backgroundColor: theme.palette.error,
        borderColor: theme.palette.error,
        hover: {
          color: theme.palette.black,
          backgroundColor: theme.palette.hover.error,
        },
      },
      outlined: {
        color: theme.palette.error,
        backgroundColor: "transparent",
        borderColor: theme.palette.error,
        hover: {
          color: theme.palette.black,
          backgroundColor: theme.palette.error,
        },
      },
    },
  },
  input: {
    secondary: {
      borderColor: theme.palette.gray[200],
      hover: {
        borderColor: theme.palette.gray[300],
      },
    },
  },
  alert: {
    primary: {
      color: theme.palette.white,
      backgroundColor: theme.palette.primary,
      icon: <InformationCircleIcon height={25} width={25} />,
    },
    error: {
      color: theme.palette.black,
      backgroundColor: theme.palette.error,
      icon: <XCircleIcon height={25} width={25} />,
    },
  },
});
