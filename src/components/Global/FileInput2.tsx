import React, { forwardRef } from "react";
import Avatar from "./Avatar";
import { convertToUrl } from "~/utils/other";

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type FileInputProps = HTMLInputProps & {
  onClear?: () => void;
  previewFile?: File | string;
  placeholderText?: string;
  previewType?: "avatar" | "background";
};

const FileInput2 = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const {
    type,
    className,
    previewFile,
    placeholderText,
    previewType,
    onClear,
    defaultValue,
    ...inputProps
  } = props;

  const url = convertToUrl(previewFile);
  const preview = previewType ?? "avatar";

  return (
    <div
      className={`flex ${previewType == "avatar" ? "flex-row items-center" : "flex-col"}  gap-5`}
    >
      {preview == "avatar" ? (
        <Avatar placeholderText={props?.placeholderText} src={url} size={62} />
      ) : (
        <div className="h-[120px] w-[380px] overflow-hidden rounded-md bg-gray-200">
          {url && <img src={url} className="w-full object-cover" />}
        </div>
      )}
      <div className="flex gap-2">
        <div className="relative">
          <input
            ref={ref}
            type="file"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            {...inputProps}
          />
          <button type="button" className="btn-secondary btn-sm btn">
            Zmień
          </button>
        </div>
        <button type="button" className="btn-ghost btn-sm btn" onClick={props.onClear}>
          Usuń
        </button>
      </div>
    </div>
  );
});

FileInput2.displayName = "FileInput2";
export default FileInput2;
