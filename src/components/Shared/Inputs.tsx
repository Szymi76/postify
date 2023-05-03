import styled, { useTheme } from "styled-components";
import { Description, ErrorText, Label } from "./Styled/Text";
import { InputBase, TextareaBase } from "./Styled/Input";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import React from "react";
import { Box, Flex } from "./Styled/Layouts";

type DivProps = React.ComponentProps<"div">;
type InputProps = React.ComponentProps<"input">;

/**
 * Element od wyświetlania etykiety, opisu i błędu pola tekstowego
 */

type InputFieldProps = {
  children: React.ReactNode;
  label?: string;
  hiddenText?: string;
  error?: string;
} & Omit<DivProps, "ref">;

export const InputField = (props: InputFieldProps) => {
  const { children, label, hiddenText, error, ...wrapperProps } = props;
  const theme = useTheme();

  const style = { paddingLeft: theme.spacing.sm };

  return (
    <Flex direction="column" gap="xs" {...wrapperProps}>
      {label && <Label style={style}>{label}</Label>}
      {children}
      {hiddenText && !error && <Description style={style}>{hiddenText}</Description>}
      {error && <ErrorText style={style}>{error}</ErrorText>}
    </Flex>
  );
};

/**
 * Pole tekstowe
 */

export const TextInput = styled(InputBase)``;

/**
 * Duże pole tekstowe
 */

export const Textarea = styled(TextareaBase)``;

/**
 * Pole tekstowe z lupą po lewej stronie
 */

type SearchTextInputProps = Omit<InputProps, "ref">;

export const SearchTextInput = (props: SearchTextInputProps) => {
  const { style, ...textInputProps } = props;

  return (
    <Box style={{ position: "relative" }}>
      <TextInput style={{ paddingLeft: 36, ...style }} {...textInputProps} Size="sm" />
      <StyledMagnifyingGlassIcon />
    </Box>
  );
};

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  left: 8px;
  top: 10px;
  height: 24px;
  color: ${({ theme }) => theme.palette.gray[300]};
`;
