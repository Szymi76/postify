import React, { useState } from "react";
import { type Alert as AlertType } from "~/providers/AlertsProvider/useAlert";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useTimeout } from "~/hooks/useTimeout";
import styled, { useTheme } from "styled-components";
import { Flex, Icon, Paragraph } from "../Shared";
import { slideInFromRight, slideInToRight } from "~/styles/animations";

const SHOW_HIDE_ANIMATION_TIME = 100;

type AlertProps = { alert: AlertType; onClose?: () => void };
export const Alert = (props: AlertProps) => {
  const { alert, onClose } = props;
  const theme = useTheme();
  const [appendCloseAnimation, setAppendCloseAnimation] = useState(false);
  useTimeout(() => setAppendCloseAnimation(true), alert.timeout - SHOW_HIDE_ANIMATION_TIME);

  const variant = theme.variants.alert[alert.type];
  const style = { color: variant.color };

  return (
    <AlertWrapper
      closeAnimation={appendCloseAnimation}
      style={{ backgroundColor: variant.backgroundColor, color: variant.color }}
    >
      <Flex justify="center" items="center" gap="md">
        <Flex style={style}>{variant.icon}</Flex>
        <Paragraph style={style}>{alert.text}</Paragraph>
      </Flex>
      {onClose && (
        <Flex items="center">
          <Icon style={style}>
            <XMarkIcon onClick={onClose} height={25} width={25} />
          </Icon>
        </Flex>
      )}
    </AlertWrapper>
  );
};

type AlertWrapperProps = { closeAnimation: boolean };
const AlertWrapper = styled.div<AlertWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: ${props => props.theme.font.size.sm};
  border-radius: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  animation: ${SHOW_HIDE_ANIMATION_TIME}ms
    ${props => (props.closeAnimation ? slideInToRight : slideInFromRight)} ease-in;
`;
