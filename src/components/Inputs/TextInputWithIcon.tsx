import React, { HTMLAttributes } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type WrapperProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type TextInputWithIconProps = {
  inputProps?: InputProps;
  wrapperProps?: WrapperProps;
  icon: React.ReactNode;
};
export const TextInputWithIcon = (props: TextInputWithIconProps) => {
  return (
    <div className="relative text-gray-500" {...props.wrapperProps}>
      <input type="text" className="input-secondary input input-sm pl-10" {...props.inputProps} />
      <div className="absolute left-2 top-2 text-gray-500">{props.icon}</div>
    </div>
  );
};
