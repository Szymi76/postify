import { createContext, useContext } from "react";

export type Values = {
  text: string;
  images: File[];
  taggedUsersIds: string[];
};

export type CreatePostContextValues = {
  values: Values;
  updateValues: (newValues: Partial<Values>) => void;
};

export const CreatePostContext = createContext<CreatePostContextValues | null>(null);

export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext)!;
  return { ...context };
};
