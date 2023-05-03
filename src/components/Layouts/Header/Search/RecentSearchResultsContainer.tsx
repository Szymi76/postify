import React from "react";
import { Flex, Headline, List, ListItemAsLink, UserCard } from "~/components/Shared";
import { pages } from "~/constants";
import { useRecentlySearched, useSearch } from "~/store";
import { api } from "~/utils/api";

const RecentSearchResultsContainer = () => {
  const { usersIds } = useRecentlySearched();
  const { data: users } = api.user.getByIds.useQuery({ ids: usersIds });
  const forceClose = useSearch(search => search.forceClose);

  if (!users) return <></>;

  return (
    <Flex direction="column" gap="sm">
      <Headline>Ostatnio wyszukiwani</Headline>
      <List>
        {users.map(user => {
          return (
            <ListItemAsLink key={user.id} href={pages.profile(user.id)} onClick={forceClose}>
              <UserCard name={user.name} src={user.image} />
            </ListItemAsLink>
          );
        })}
      </List>
    </Flex>
  );
};

export default RecentSearchResultsContainer;
