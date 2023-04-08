import React from "react";

type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type LoadingButtonProps = HTMLButtonProps & { loading?: boolean };
const LoadingButton = (props: LoadingButtonProps) => {
  let className = props.className;
  if (className) className += `${props.loading ? " loading" : ""}`;

  const propsCopy = { ...props };
  delete propsCopy.loading;
  delete propsCopy.className;

  return <button {...propsCopy} className={className} />;
};

export default LoadingButton;
