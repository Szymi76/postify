import React from "react";
import styled from "styled-components";
import { Box, Flex, Icon, Name, Tooltip } from "~/components/Shared";

type RestPhotosDetailsProps = { text: string; tooltipText: string; icon: React.ReactNode };
const RestPhotosDetails = (props: RestPhotosDetailsProps) => {
  return (
    <RestPhotosDetailsWrapper>
      <Name>{props.text}</Name>
      <Tooltip id="RestPhotosDetails" content={props.tooltipText}>
        <Icon>{props.icon}</Icon>
      </Tooltip>
    </RestPhotosDetailsWrapper>
  );
};

export default RestPhotosDetails;

const RestPhotosDetailsWrapper = styled(Box)`
  display: flex;
  height: 80px;
  width: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette.gray[300]};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.font.size.lg};
  color: ${props => props.theme.palette.gray[600]};
`;
