const MAX_NAME_LEN = 16;
const MIN_NAME_LEN = 3;

export const validUserName = (name: string) => {
  if (name.length >= MIN_NAME_LEN && name.length <= MAX_NAME_LEN) return name;
  return null;
};
