import React, { useState } from "react";

// sortSelect is the state
// sortHandler is a function for changing the state.

export const SortContext = React.createContext({
  sortSelect: "",
  sortHandler: () => {},
});

// eslint-disable-next-line react/prop-types
const SortContextProvider = ({ children }) => {
  const [sortSelect, setSortSelect] = useState("");

  const sortHandler = (sortSelect) => {
    setSortSelect(sortSelect);
  };

  return (
    <SortContext.Provider value={{ sortSelect, sortHandler }}>
      {children}
    </SortContext.Provider>
  );
};

export default SortContextProvider;
