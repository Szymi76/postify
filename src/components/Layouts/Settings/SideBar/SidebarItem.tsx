import Link from "next/link";
import styled from "styled-components";
import { Description, Flex, Headline } from "~/components/Shared";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  onlyIcon: boolean;
  href: string;
  active: boolean;
};
const SidebarItem = (props: SidebarItemProps) => {
  return (
    <SidebarItemWrapper href={props.href} $active={props.active} $iconOnly={props.onlyIcon}>
      {props.icon}
      {!props.onlyIcon && (
        <Flex direction="column">
          <Headline>{props.label}</Headline>
          <Description>{props.description}</Description>
        </Flex>
      )}
    </SidebarItemWrapper>
  );
};
export default SidebarItem;
type SidebarItemWrapperProps = { $active: boolean; $iconOnly: boolean };
const SidebarItemWrapper = styled(Link)<SidebarItemWrapperProps>`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: ${props => (!props.$iconOnly ? "flex-start" : "center")};
  border-bottom: 1px solid ${props => props.theme.palette.gray[200]};
  transition-duration: 100ms;
  padding: ${props => props.theme.spacing.lg + " " + props.theme.spacing.sm};
  color: ${props => (props.$active ? props.theme.palette.white : props.theme.palette.black)};
  max-height: 120px;
  overflow: hidden;
  background-color: ${props =>
    props.$active ? props.theme.palette.primary : props.theme.palette.white};
  :hover {
    background-color: ${props =>
      props.$active ? props.theme.palette.hover.primary : props.theme.palette.gray[100]};
  }
  ${Headline}, ${Description} {
    color: ${props => (props.$active ? props.theme.palette.white : props.theme.palette.black)};
  }
`;
