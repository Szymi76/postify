const LS_KEY = "recently-searched";
const MAX_RECENTLY_SEARCHED_USERS = 5;

export const addUserToRecentlySearched = (userId: string) => {
  const recentlySearchedJSON = localStorage.getItem(LS_KEY);
  let recentlySearched: string[] = [];

  if (!recentlySearchedJSON) localStorage.setItem(LS_KEY, JSON.stringify([]));
  else recentlySearched = JSON.parse(recentlySearchedJSON) as string[];

  recentlySearched.unshift(userId);

  if (recentlySearched.length > MAX_RECENTLY_SEARCHED_USERS) recentlySearched.pop();

  recentlySearched = Array.from(new Set(recentlySearched));

  localStorage.setItem(LS_KEY, JSON.stringify(recentlySearched));
};

export const getRecentlySearchedUsers = () => {
  const recentlySearchedJSON = localStorage.getItem(LS_KEY);
  let recentlySearched: string[] = [];

  if (!recentlySearchedJSON) localStorage.setItem(LS_KEY, JSON.stringify([]));
  else recentlySearched = JSON.parse(recentlySearchedJSON) as string[];

  return recentlySearched;
};
