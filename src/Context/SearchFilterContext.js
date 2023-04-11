import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

export const SearchFilterContext = createContext(null)

export const SearchFilterContextProvider = ({children}) => {
  
  const [currentSearch, setCurrentSearch] = useState('')
  const [sort, setSort] = useState('priorityscore')

  const [isSingleFamily, setIsSingleFamily] = useState(true)
  const [isMultiFamily, setIsMultiFamily] = useState(true)
  const [isApartment, setIsApartment] = useState(true)
  const [isCondo, setIsCondo] = useState(true)
  const [isManufactured, setIsManufactured] = useState(true)
  const [isTownhouse, setIsTownhouse] = useState(true)
  const [isLotLand, setIsLotLand] = useState(false)

  return(
    <SearchFilterContext.Provider value={{currentSearch,
                                          sort,
                                          isSingleFamily,
                                          isMultiFamily,
                                          isApartment,
                                          isCondo,
                                          isManufactured,
                                          isTownhouse,
                                          isLotLand,
                                          setCurrentSearch,
                                          setSort,
                                          setIsSingleFamily,
                                          setIsMultiFamily,
                                          setIsApartment,
                                          setIsCondo,
                                          setIsManufactured,
                                          setIsTownhouse,
                                          setIsLotLand}}>
      {children}
    </SearchFilterContext.Provider>
  )

}
