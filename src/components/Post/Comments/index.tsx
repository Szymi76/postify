import React, { useState } from "react";
import WriteComment from "./WriteComment";
import { RouterOutputs, api } from "~/utils/api";
import SingleComment from "./Comment";
import Link from "next/link";

type CommentsProps = {
  fullSection: boolean;
  post: RouterOutputs["post"]["getPostById"];
  refetch: () => void;
};

const Comments = (props: CommentsProps) => {
  const [hideComments, setHideComments] = useState(false);
  const { data, fetchNextPage, hasNextPage, refetch } =
    api.comment.getInfiniteComments.useInfiniteQuery(
      { limit: 5, postId: props.post!.id },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const comments = data?.pages.map((page) => page.items).flat() ?? [];
  const alignHideShowTextEnd = hideComments || !hasNextPage;

  return (
    <div>
      {/* [KAŻDY] INFORMACJA O BRAKU KOMENTARZY */}
      {comments.length == 0 && (
        <h4 className={`text-sm text-gray-500 ${props.fullSection ? "mb-4" : ""}`}>
          Brak komentarzy
        </h4>
      )}
      <div>
        {/* [BRAK PEŁNEJ SEKCJI] PIERWSZY KOMENTARZ */}
        {!props.fullSection && comments[0] && (
          <SingleComment comment={comments[0]} refetch={() => void refetch()} />
        )}

        {/* [PEŁNA SEKCJA] LISTA WSZYTSKICH ZAŁADOWANYCH KOMENTARZY */}
        {props.fullSection &&
          !hideComments &&
          comments.map((comment) => {
            return (
              <SingleComment key={comment.id} comment={comment} refetch={() => void refetch()} />
            );
          })}

        <div className={`mt-2 flex ${alignHideShowTextEnd ? "justify-end" : "justify-between"}`}>
          {/* [PEŁNA SEKCJA] TEXT DO ZAŁADOWANIA KOLEJNYCH KOMENTARZY */}
          {hasNextPage && props.fullSection && !hideComments && (
            <p className="icon text-sm text-primary" onClick={() => void fetchNextPage()}>
              Załaduj więcej komentarzy
            </p>
          )}
          {/* [PEŁNA SEKCJA] TEXT DO POKAZYWANIA/CHOWANIA KOMENTARZY */}
          {props.fullSection && (
            <p className="icon text-sm text-primary" onClick={() => setHideComments(!hideComments)}>
              {hideComments ? "Pokaż komentarze" : "Ukryj komentarze"}
            </p>
          )}
        </div>
      </div>

      {/* [PEŁNA SEKCJA] KOMPONENT DO TWORZNIA NOWEGO KOMENTARZA */}
      {props.fullSection && <WriteComment postId={props.post!.id} refetch={() => void refetch()} />}

      {/* [BRAK PEŁNEJ SEKCJI] LINK DO PEŁNEGO POSTA */}
      {!props.fullSection && (
        <div className="mt-2 flex gap-1 text-sm text-primary">
          <Link href={`post/${props.post!.id}`} className="hover:underline">
            Pokaż więcej komentrzy
          </Link>
          <Link href={`post/${props.post!.id}`} className="hover:underline">
            Skomentuj
          </Link>
        </div>
      )}
    </div>
  );
};

export default Comments;
