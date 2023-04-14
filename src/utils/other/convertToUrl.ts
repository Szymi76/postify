export const convertToUrl = (file: string | File | undefined) => {
  if (typeof file == "string") return file;
  else if (file) return URL.createObjectURL(file);
  else return undefined;
};
