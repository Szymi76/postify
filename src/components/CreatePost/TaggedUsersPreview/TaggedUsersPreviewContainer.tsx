import React from "react";
import { useCreatePostContext } from "../CreatePostContext";
import { type ReactChild } from "~/types";
import { api } from "~/utils/api";
import { QuestionMarkAsTooltip } from "~/components/Global";
import SmallUserCard from "./SmallUserCard";

const TaggedUsersPreviewContainer = () => {
  const { values } = useCreatePostContext();
  const { data: users } = api.user.getByIds.useQuery({ ids: values.taggedUsersIds });

  if (!users || users.length == 0) return <></>;

  return (
    <>
      <QuestionMarkAsTooltip
        className="tooltip-left"
        text="Lista osób, które pojawią się jako oznaczone w twoim poście."
      />
      <Wrapper>
        {users.map((user) => (
          <SmallUserCard key={user.id} user={user} />
        ))}
      </Wrapper>
    </>
  );
};

export default TaggedUsersPreviewContainer;

const Wrapper = (props: ReactChild) => {
  return (
    <div className="flex justify-end">
      <div className="flex max-w-xl flex-wrap gap-2 rounded-md bg-slate-200 p-2">
        {props.children}
      </div>
    </div>
  );
};
