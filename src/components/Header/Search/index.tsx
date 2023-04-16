import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import React, { useRef, useState } from "react";
import { api } from "~/utils/api";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import useDebounce from "~/hooks/useBebounce";
import { addUserToRecentlySearched, getRecentlySearchedUsers } from "~/utils/other";
import * as UsersList from "./UsersList";
import { useSearch } from "~/store";
import BottomNavigation from "~/components/BottomNavigation";
import { useOnKey } from "~/hooks/useOnKey";
import { TailSpin } from "react-loader-spinner";

const Search = () => {
  const { query, setQuery, isOpen, forceClose } = useSearch();
  const recentlySearchedUsersIds = getRecentlySearchedUsers();
  const debouncedQuery = useDebounce(query, 300);
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingResults,
  } = api.user.getInfiniteUsersWithQuery.useInfiniteQuery(
    {
      limit: 4,
      query: debouncedQuery as string,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const { data } = api.user.getByIds.useQuery({ ids: recentlySearchedUsersIds });
  const searchFieldRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const resultsRef = useOutsideClick<HTMLDivElement>(forceClose, [searchFieldRef, bottomNavRef]);
  const recentlySearchedUsers = data ?? [];
  const users = infiniteData?.pages.map((page) => page.items.map((item) => item)).flat() ?? [];
  const showResults = Boolean(query) || isOpen;

  const handleUserClick = (userId: string) => {
    addUserToRecentlySearched(userId);
    forceClose();
  };

  useOnKey("Escape", forceClose);

  return (
    <>
      <div ref={searchFieldRef} className="relative hidden text-gray-500 sm:block">
        <input
          type="text"
          className="input-secondary input input-sm w-[300px] pl-10 md:w-[400px] lg:w-[475px]"
          placeholder="Szukaj osób, społeczności..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute left-2 top-2 text-gray-500">
          <MagnifyingGlassIcon className="h-6" />
        </div>
      </div>
      {showResults && (
        <div
          ref={resultsRef}
          className="layout absolute top-16 left-1/2 max-h-[70vh] w-[97%] max-w-2xl -translate-x-[51%] overflow-y-auto text-black"
        >
          <div className="relative text-gray-500 sm:hidden">
            <input
              type="text"
              className="input-secondary input input-sm mx-auto w-[100%] pl-10"
              placeholder="Szukaj osób, społeczności..."
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="absolute left-2 top-2 text-gray-500">
              <MagnifyingGlassIcon className="h-6" />
            </div>
          </div>
          <UsersList.Title>
            Wyniki {isLoadingResults && <TailSpin height={20} width={20} color="#3b82f6" />}
          </UsersList.Title>
          <UsersList.List users={users} onEachClick={handleUserClick} />
          {hasNextPage && <UsersList.FetchMoreUsersButton onClick={() => void fetchNextPage()} />}
          <UsersList.Title>Ostatnio wyszukiwani</UsersList.Title>
          <UsersList.List users={recentlySearchedUsers} onEachClick={handleUserClick} />
        </div>
      )}
      <BottomNavigation ref={bottomNavRef} />
    </>
  );
};

export default Search;
