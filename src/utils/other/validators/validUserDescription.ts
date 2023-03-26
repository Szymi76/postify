const MAX_NAME_LEN = 80;
const MIN_NAME_LEN = 0;

export const validUserDescription = (description: string) => {
  if (description.length >= MIN_NAME_LEN && description.length <= MAX_NAME_LEN) return description;
  return null;
};
