import React from "react";
import { useTheme } from "styled-components";
import { Oval } from "react-loader-spinner";
import { Flex } from "./Styled/Layouts";

type Size = "sm" | "md" | "lg";

/**
 * Kręcące się kółko
 */

type CustomOvalProps = { size?: number; color?: string };

const CustomOval = (props: CustomOvalProps) => {
  const theme = useTheme();

  return (
    <Oval
      color={props.color ?? theme.palette.primary}
      secondaryColor={props.color ?? theme.palette.primary}
      height={props.size}
      width={props.size}
    />
  );
};

/**
 * Spinner
 */

type SpinnerProps = { size?: Size; color?: string; center?: boolean };

export const Spinner = (props: SpinnerProps) => {
  const { size, center } = props;
  const sizeAsNumber = getSizeAsNumber(size);

  if (!center) return <CustomOval size={sizeAsNumber} color={props.color} />;

  return (
    <Flex justify="center" items="center">
      <CustomOval size={sizeAsNumber} color={props.color} />
    </Flex>
  );
};

function getSizeAsNumber(size?: Size) {
  if (!size) return 40;
  if (size == "sm") return 20;
  if (size == "md") return 40;
  return 80;
}
