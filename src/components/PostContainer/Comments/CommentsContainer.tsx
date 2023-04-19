import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePostContext } from "../PostContext";
import { useInfiniteComments } from "../hooks";
import { PAGES } from "~/constants";

import Link from "next/link";
import WriteCommentContainer from "./WriteCommentContainer";
import SingleCommentContainer from "./SingleCommentContainer";

const CommentsContainer = () => {
  const { post, fullSection } = usePostContext();
  const [hideComments, setHideComments] = useState(false);
  const currentUser = useSession().data?.user;
  const { comments, fetchNextPage, hasNextPage } = useInfiniteComments(post.id);

  const alignHideShowTextEnd = hideComments || !hasNextPage;
  const fullCommentsSection = fullSection && !hideComments;
  const showLoadMoreComments = hasNextPage && fullSection && !hideComments;
  const showWriteNewCommentContainer = fullSection && currentUser;

  return (
    <div>
      {/* [KAŻDY] INFORMACJA O BRAKU KOMENTARZY */}
      {comments.length == 0 && <ZeroCommentsText fullSection={fullSection} />}
      <div>
        {/* [BRAK PEŁNEJ SEKCJI] PIERWSZY KOMENTARZ */}
        {!fullSection && comments[0] && <SingleCommentContainer comment={comments[0]} />}

        {/* [PEŁNA SEKCJA] LISTA WSZYTSKICH ZAŁADOWANYCH KOMENTARZY */}
        <div id="see-comments">
          {fullCommentsSection &&
            comments.map((comment) => {
              return <SingleCommentContainer key={comment.id} comment={comment} />;
            })}
        </div>

        <div className={`mt-2 flex ${alignHideShowTextEnd ? "justify-end" : "justify-between"}`}>
          {/* [PEŁNA SEKCJA] TEXT DO ZAŁADOWANIA KOLEJNYCH KOMENTARZY */}
          {showLoadMoreComments && <LoadMoreCommentsText onLoadMore={() => void fetchNextPage()} />}
          {/* [PEŁNA SEKCJA] TEXT DO POKAZYWANIA/CHOWANIA KOMENTARZY */}
          {fullSection && (
            <ToggleCommentsVisibility
              show={!hideComments}
              onToggle={() => setHideComments(!hideComments)}
            />
          )}
        </div>
      </div>

      {/* [PEŁNA SEKCJA] KOMPONENT DO TWORZNIA NOWEGO KOMENTARZA */}
      {showWriteNewCommentContainer && <WriteCommentContainer />}

      {/* [BRAK PEŁNEJ SEKCJI] LINK DO PEŁNEGO POSTA */}
      {!fullSection && (
        <div className="mt-2 flex gap-1 text-sm text-primary">
          <ActionLink href={PAGES.POST(`${post.id}#see-comments`)}>
            Pokaż więcej komentrzy
          </ActionLink>
          /<ActionLink href={PAGES.POST(`${post.id}#write-comment`)}>Skomentuj</ActionLink>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;

type ZeroCommentsTextProps = { fullSection: boolean };
const ZeroCommentsText = (props: ZeroCommentsTextProps) => {
  return (
    <h4 className={`text-sm text-gray-500 ${props.fullSection ? "mb-4" : ""}`}>Brak komentarzy</h4>
  );
};

type LoadMoreCommentsTextProps = { onLoadMore: () => void };
const LoadMoreCommentsText = (props: LoadMoreCommentsTextProps) => {
  return (
    <p className="icon text-sm text-primary" onClick={props.onLoadMore}>
      Załaduj więcej komentarzy
    </p>
  );
};

type ToggleCommentsVisibilityProps = { show: boolean; onToggle: () => void };
const ToggleCommentsVisibility = (props: ToggleCommentsVisibilityProps) => {
  return (
    <p className="icon text-sm text-primary" onClick={props.onToggle}>
      {props.show ? "Ukryj komentarze" : "Pokaż komentarze"}
    </p>
  );
};

type ActionLinkProps = { href: string; children: React.ReactNode };
const ActionLink = (props: ActionLinkProps) => {
  return (
    <Link href={props.href} className="hover:underline">
      {props.children}
    </Link>
  );
};
