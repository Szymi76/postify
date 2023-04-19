import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import { HEADER_HEIGHT } from "~/constants";

const Y_PADDING = 40; // w pikselach
const paddingTop = `${HEADER_HEIGHT + Y_PADDING}px`;
const paddingBottom = `${Y_PADDING}px`;

type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type ScrollablePageProps = HTMLDivProps;
const ScrollablePage = forwardRef<HTMLDivElement, ScrollablePageProps>((props, ref) => {
  const { className, style, ...divProps } = props;

  return (
    <div
      ref={ref}
      className={`h-screen overflow-y-auto ${className ?? ""}`}
      {...divProps}
      style={{ paddingTop, paddingBottom }}
    >
      {props.children}
    </div>
  );
});

ScrollablePage.displayName = "ScrollablePage";
export default ScrollablePage;
