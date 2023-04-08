import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

const IDS = [
  // "clfpu2cf60000v2hoolwv85nm",
  "clfpu31gx0006v2hoyiravlz3",
  "clfyfqlmp0000v24kak0usu6t",
  "clg4a673j0000v2rcf078hsm0",
];

const Page = () => {
  const [limit, setLimit] = useState(1);

  const {
    data: users,
    fetchNextPage,
    isLoading,
  } = api.user.getInfiniteUsersWithIds.useInfiniteQuery(
    {
      limit,
      ids: IDS,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  const usersRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const isScrollAtEnd =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (isScrollAtEnd) void fetchNextPage();
  };

  return (
    <>
      <div ref={usersRef} onScroll={handleScroll} className="max-h-[50vh] overflow-scroll">
        {users &&
          users?.pages.map((page) => {
            return page.items.map((user) => {
              return (
                <h1 className="m-3 h-[90vh] border" key={user.id}>
                  {user.email}
                </h1>
              );
            });
          })}
        {isLoading && <h1>ŁADOWANIE...</h1>}
      </div>
      <button className="mt-2 border bg-slate-600 p-1" onClick={() => void fetchNextPage()}>
        POBIERZ KOLEJNEGO UŻYTKOWNIKA
      </button>
    </>
  );
};

export default Page;
