import { useContext, createContext } from "react";
import { RouterOutputs } from "~/utils/api";

export type PostContextValues = {
  post: RouterOutputs["post"]["getPostById"];
  fullSection: boolean;
};

export const PostContext = createContext<PostContextValues | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext)!;
  const { post, fullSection } = context;
  return { post: post!, fullSection };
};
