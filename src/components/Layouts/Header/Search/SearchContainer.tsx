import React, { useRef } from "react";
import { useOnClickOutside } from "~/hooks";
import { useSearch } from "~/store";
import BottomNavigation from "~/components/Layouts/BottomNavigation/BottomNavContainer";
import { useOnKey } from "~/hooks/useOnKey";
import { Box, Paper, SearchTextInput } from "~/components/Shared";
import styled from "styled-components";
import SearchResultsContainer from "./SearchResultsContainer";
import RecentSearchResultsContainer from "./RecentSearchResultsContainer";

const SearchContainer = () => {
  const { query, setQuery, isOpen, forceClose, setOpen } = useSearch();
  const searchFieldRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const resultsRef = useOnClickOutside<HTMLDivElement>(forceClose, [searchFieldRef, bottomNavRef]);
  const showResults = Boolean(query) || isOpen;

  useOnKey("Escape", forceClose);

  return (
    <>
      <SearchTextInputWrapper ref={searchFieldRef}>
        <SearchTextInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Szukaj osób, społeczności..."
          style={{ width: "100%" }}
          onFocus={() => setOpen(true)}
        />
      </SearchTextInputWrapper>

      {showResults && (
        <ResultsWrapper ref={resultsRef}>
          <ResultSearchTextInputWrapper>
            <SearchTextInput
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Szukaj osób, społeczności..."
              style={{ width: "100%" }}
              autoFocus
            />
          </ResultSearchTextInputWrapper>
          <SearchResultsContainer />
          {!query && <RecentSearchResultsContainer />}
        </ResultsWrapper>
      )}
      <BottomNavigation ref={bottomNavRef} />
    </>
  );
};

export default SearchContainer;

const ResultsWrapper = styled(Paper)`
  position: absolute;
  top: ${props => props.theme.layouts.header.height + 10}px;
  left: 50%;
  transform: translateX(-50%);
  width: 97%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  max-height: 500px;
  overflow-y: auto;
`;

const SearchTextInputWrapper = styled(Box)`
  @media (max-width: ${props => props.theme.breakpoint.sm}) {
    display: none;
  }
  @media (max-width: ${props => props.theme.breakpoint.md}) {
    width: 350px;
  }
  width: 450px;
`;

const ResultSearchTextInputWrapper = styled(Box)`
  margin: auto;
  margin-bottom: ${props => props.theme.spacing.md};
  display: none;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoint.sm}) {
    display: block;
  }
`;
