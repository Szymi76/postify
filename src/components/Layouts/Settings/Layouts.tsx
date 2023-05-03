import React from "react";
import styled from "styled-components";
import { Box, Headline } from "~/components/Shared";

export const Wrapper = styled(Box)`
  display: flex;
  height: 100vh;
  padding-top: ${props => props.theme.layouts.header.height}px;
  @media (max-width: ${props => props.theme.breakpoint.md}) {
    padding-left: ${props => props.theme.layouts.settingsSidebar.widthWhenClosed}px;
  }
`;
export const FormWrapper = styled(Box)`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;

export const FormContainer = styled.form`
  margin: auto;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 750px;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing["2xl"] + " " + props.theme.spacing.lg};
`;

export const FormTitle = styled(Headline)`
  border-bottom: 1px solid ${props => props.theme.palette.gray[200]};
  font-size: ${props => props.theme.font.size["3xl"]};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const FormFooter = styled(Box)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xl} 0px;
`;
