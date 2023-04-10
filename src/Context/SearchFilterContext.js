import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

export const SearchFilterContext = createContext(null)

export const SearchFilterContextProvider = ({children}) => {
  
  const [currentSearch, setCurrentSearch] = useState('')
  const [sort, setSort] = useState('priorityscore')

  return(
    <SearchFilterContext.Provider value={{currentSearch,
                                          sort,
                                          setCurrentSearch,
                                          setSort}}>
      {children}
    </SearchFilterContext.Provider>
  )

}
