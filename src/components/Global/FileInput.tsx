import React from "react";
import Avatar from "./Avatar";

type FileInputProps = {
  file: string | File | null | undefined;
  onChange: (file: File | null) => void;
  onClear?: () => void;
  avatarText?: string;
};
const FileInput = (props: FileInputProps) => {
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return props.onChange(null);
    return props.onChange(files[0]!);
  };

  const avatarUrl = () => {
    if (typeof props.file == "string") return props.file;
    else if (props.file) return URL.createObjectURL(props.file);
    else return undefined;
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar placeholderText={props.avatarText} src={avatarUrl()} />
      <div className="relative">
        <input
          type="file"
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          multiple={false}
          onChange={handleChnage}
        />
        <button className="btn-secondary btn-sm btn">Zmień</button>
      </div>
      <button className="btn-ghost btn-sm btn" onClick={props.onClear}>
        Usuń
      </button>
    </div>
  );
};

export default FileInput;
