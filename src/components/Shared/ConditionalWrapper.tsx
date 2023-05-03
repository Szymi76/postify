type ConditionalWrapperProps = {
  condition: any;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
};
/**
 *
 * Wrapper w zależności od stanu umieści element we wrapperze.
 */
export const ConditionalWrapper = (props: ConditionalWrapperProps) => {
  return <> {props.condition ? props.wrapper(props.children) : props.children}</>;
};
