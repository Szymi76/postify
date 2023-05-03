import styled from "styled-components";
import { Paper } from "../Shared";
import { useOnClickOutside } from "~/hooks";
import { useEffect, useRef } from "react";
import { appearFromBottom } from "~/styles/animations";
import { useRouter } from "next/router";

type WrapperProps = { children: React.ReactNode };
export const Wrapper = (props: WrapperProps) => {
  const router = useRouter();
  const initialPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!initialPathname.current) initialPathname.current = router.pathname;
  }, []);

  if (router.pathname != initialPathname.current && initialPathname.current !== null) return <></>;

  return <WrapperWrapper>{props.children}</WrapperWrapper>;
};

type ModaWrapperProps = { show?: boolean };
export const WrapperWrapper = styled.div<ModaWrapperProps>`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(226, 232, 240, 0.35);
  display: ${props => (props?.show === false ? "none" : "flex")};
  justify-content: center;
  align-items: center;
`;

type ModalBoxProps = Omit<React.ComponentProps<"div">, "ref"> & { onClose: () => void };
export const Box = (props: ModalBoxProps) => {
  const { onClose, ...wrapperBoxProps } = props;
  const ready = useRef(false);
  const ref = useOnClickOutside<HTMLDivElement>(() => {
    if (ready.current) onClose();
    ready.current = true;
  });

  return <BoxWrapper ref={ref} {...wrapperBoxProps} />;
};

const BoxWrapper = styled(Paper)`
  max-height: 500px;
  width: 90%;
  max-width: 575px;
  animation: 200ms ${appearFromBottom} ease-in;
  z-index: 20;
`;

export const Title = styled.h2`
  font-size: ${props => props.theme.font.size["2xl"]};
  font-weight: ${props => props.theme.font.weight.medium};
  color: ${props => props.theme.palette.black};
`;

export const Description = styled.p`
  font-size: ${props => props.theme.font.size.sm};
  color: ${props => props.theme.palette.gray[500]};
`;

export const Content = styled.div`
  margin: ${props => props.theme.spacing.lg} 0px;
  overflow-y: auto;
  max-height: 350px;
`;

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
`;
