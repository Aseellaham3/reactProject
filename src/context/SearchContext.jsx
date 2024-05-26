import React, { useState } from "react";
import PropTypes from 'prop-types';

// query is the state
// SearchHandler is a function for changing the state.

export const SearchContext = React.createContext({
  query: "",
  searchHandler: () => {},
});

const SearchContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  const searchHandler = (query) => {
    setQuery(query);
  };
  SearchContextProvider.propTypes = {
    children: PropTypes.any
  };
  return (
    <SearchContext.Provider value={{ query, searchHandler }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
