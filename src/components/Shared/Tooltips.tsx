import { Tooltip as ReactTooltip } from "react-tooltip";
import styled from "styled-components";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { usePalette } from "~/styles/usePalette";

/**
 * Tooltip
 */

type TooltipProps = { children: React.ReactNode; id: string; content: string };

export const Tooltip = (props: TooltipProps) => {
  const paletteTheme = usePalette(state => state.theme);

  return (
    <TooltipWrapper>
      <a
        data-tooltip-id={props.id}
        data-tooltip-content={props.content}
        data-tooltip-variant={paletteTheme == "dark" ? "light" : "dark"}
      >
        {props.children}
      </a>
      <ReactTooltip id={props.id} style={{ maxWidth: 300, whiteSpace: "normal" }} />
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  width: min-content;
  white-space: nowrap;
`;

/**
 * Znak zapytania jako tooltip
 */

type QuestionMarkTooltipProps = {
  id: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
} & Omit<TooltipProps, "children">;

export const QuestionMarkTooltip = (props: QuestionMarkTooltipProps) => {
  const { top, right, bottom, left, ...tooltipProps } = props;

  return (
    <QuestionMarkTooltipWrapper style={{ top, right, bottom, left }}>
      <Tooltip {...tooltipProps}>
        <QuestionMarkCircleIcon height={24} />
      </Tooltip>
    </QuestionMarkTooltipWrapper>
  );
};

const QuestionMarkTooltipWrapper = styled.div`
  position: absolute;
  color: ${props => props.theme.palette.gray[500]};
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;
