import React from "react";
import {
  ActionText,
  Description,
  Flex,
  Headline,
  List,
  ListItemAsLink,
  Spinner,
  UserCard,
} from "~/components/Shared";
import { pages } from "~/constants";
import { useDebounce } from "~/hooks";
import { useInfiniteUsers } from "~/hooks/useInfiniteQueryHelpers/useInfiniteUsers";
import { useRecentlySearched, useSearch } from "~/store";

const SearchResultsContainer = () => {
  const { query, forceClose } = useSearch();
  const { add: addUserToRecentlySearched } = useRecentlySearched();
  const { users, fetchNextPage, hasNextPage, isFetching } = useInfiniteUsers({
    query: useDebounce(query, 300) as string,
    limit: 4,
  });

  const handleUserClick = (userId: string) => {
    addUserToRecentlySearched(userId);
    forceClose();
  };

  if (!query) return <></>;

  return (
    <Flex direction="column" gap="sm">
      <Headline>Wyniki</Headline>
      <List>
        {users.map(user => {
          return (
            <ListItemAsLink
              key={user.id}
              href={pages.profile(user.id)}
              onClick={() => handleUserClick(user.id)}
            >
              <UserCard name={user.name} src={user.image} />
            </ListItemAsLink>
          );
        })}
      </List>
      {users.length == 0 && !isFetching && <Description>Brak wyników</Description>}
      {hasNextPage && <ActionText onClick={() => void fetchNextPage()}>Pokaż więcej</ActionText>}
    </Flex>
  );
};

export default SearchResultsContainer;
