import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePostContext } from "../PostContext";
import { useInfiniteComments } from "~/hooks/useInfiniteQueryHelpers";
import { pages } from "~/constants";

import Link from "next/link";
import WriteCommentContainer from "./WriteCommentContainer";
import SingleCommentContainer from "./SingleCommentContainer";
import { ActionText, Box, Description, Flex } from "~/components/Shared";

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
    <Box>
      {/* [KAŻDY] INFORMACJA O BRAKU KOMENTARZY */}
      {comments.length == 0 && (
        <Description style={{ marginBottom: fullSection ? 16 : 0 }}>Brak komentarzy</Description>
      )}

      <Box>
        {/* [BRAK PEŁNEJ SEKCJI] PIERWSZY KOMENTARZ */}
        {!fullSection && comments[0] && <SingleCommentContainer comment={comments[0]} />}

        {/* [PEŁNA SEKCJA] LISTA WSZYTSKICH ZAŁADOWANYCH KOMENTARZY */}
        <Box id="see-comments">
          {fullCommentsSection &&
            comments.map(comment => {
              return <SingleCommentContainer key={comment.id} comment={comment} />;
            })}
        </Box>

        <Flex justify={alignHideShowTextEnd ? "justify-end" : "justify-between"}>
          {/* [PEŁNA SEKCJA] TEXT DO ZAŁADOWANIA KOLEJNYCH KOMENTARZY */}
          {showLoadMoreComments && (
            <ActionText onClick={() => void fetchNextPage()}>Załaduj więcej komentarzy</ActionText>
          )}
          {/* [PEŁNA SEKCJA] TEXT DO POKAZYWANIA/CHOWANIA KOMENTARZY */}
          {fullSection && (
            <Flex justify="flex-end" style={{ width: "100%" }}>
              <ActionText center={false} onClick={() => setHideComments(!hideComments)}>
                {!hideComments ? "Ukryj komentarze" : "Pokaż komentarze"}
              </ActionText>
            </Flex>
          )}
        </Flex>
      </Box>

      {/* [PEŁNA SEKCJA] KOMPONENT DO TWORZNIA NOWEGO KOMENTARZA */}
      {showWriteNewCommentContainer && <WriteCommentContainer />}

      {/* [BRAK PEŁNEJ SEKCJI] LINK DO PEŁNEGO POSTA */}
      {!fullSection && (
        <Flex gap="sm">
          <Link href={pages.post(`${post.id}#see-comments`)}>
            <ActionText>Pokaż więcej komentrzy</ActionText>
          </Link>
          •
          <Link href={pages.post(`${post.id}#write-comment`)}>
            <ActionText>Skomentuj</ActionText>
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default CommentsContainer;
