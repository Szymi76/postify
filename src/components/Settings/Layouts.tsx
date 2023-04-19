import React from "react";
import { HEADER_HEIGHT } from "~/constants";

/*
    WRAPPER
*/

type WrapperProps = { children: React.ReactNode };
export const Wrapper = (props: WrapperProps) => {
  // const height = `calc(100vh - ${HEADER_HEIGHT}px)`;

  return <div className="flex h-screen bg-slate-100">{props.children}</div>;
};

/*
    FORM
*/

type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
type FormProps = HTMLFormProps;
export const Form = (props: FormProps) => {
  const { className, ...formProps } = props;

  // const height = `calc(100vh - ${HEADER_HEIGHT}px)`;
  const paddingTop = `${HEADER_HEIGHT + 40}px`;

  return (
    <div className="flex-1 overflow-y-auto">
      <form
        {...formProps}
        className="mx-auto flex h-screen w-full max-w-3xl flex-col gap-5 px-5 py-8"
        style={{ paddingTop }}
      />
    </div>
  );
};

/*
    TITLE
*/

type TitleProps = { children: React.ReactNode };
export const Title = (props: TitleProps) => {
  return <h1 className="text-3xl font-semibold">{props.children}</h1>;
};

/*
    SECTION DESCIPTION
*/

type SectionDescriptionProps = { title: string; description?: string };
export const SectionDescription = (props: SectionDescriptionProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-600">{props.title}</h3>
      <p className="text-sm text-gray-500">{props.description}</p>
    </div>
  );
};

/*
    FOOTER
*/

type FooterProps = { children: React.ReactNode };
export const Footer = (props: FooterProps) => {
  return (
    <div className="flex flex-1 items-end">
      <div className="my-1 flex flex-1 justify-end gap-3 border-t border-slate-200 py-3">
        {props.children}
      </div>
    </div>
  );
};

/*
    INPUT CONTAINER
*/

type FormControlProps = { children: React.ReactNode; error?: string; label: string; alt?: string };
export const FormControl = (props: FormControlProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      {props.children}
      <label className="label">
        <span className="label-text-alt text-error">{props.error ?? props.alt}</span>
      </label>
    </div>
  );
};
