import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

export const SearchFilterContext = createContext(null)

export const SearchFilterContextProvider = ({children}) => {
  
  const [currentSearch, setCurrentSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('Los Angeles, CA')
  const [sort, setSort] = useState('priorityscore')

  const [isSingleFamily, setIsSingleFamily] = useState(true)
  const [isMultiFamily, setIsMultiFamily] = useState(true)
  const [isApartment, setIsApartment] = useState(true)
  const [isCondo, setIsCondo] = useState(true)
  const [isManufactured, setIsManufactured] = useState(true)
  const [isTownhouse, setIsTownhouse] = useState(true)
  const [isLotLand, setIsLotLand] = useState(false)

  const [beds, setBeds] = useState(null)
  const [baths, setBaths] = useState(null)

  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)

  const [maxHoa, setMaxHoa] = useState(null)

  const [sqftMin, setSqftMin] = useState(null)
  const [sqftMax, setSqftMax] = useState(null)

  const [hasPool, setHasPool] = useState(false)
  const [hasGarage, setHasGarage] = useState(false)
  const [hasAC, setHasAC] = useState(false)
  const [isSingleStory, setIsSingleStory] = useState(false)

  const [cityView, setCityView] =  useState(false)
  const [mountainView, setMountainView] = useState(false)
  const [waterView, setWaterView] = useState(false)
  const [waterFront, setWaterFront] = useState(false)

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
                                          beds,
                                          baths,
                                          priceMin,
                                          priceMax,
                                          maxHoa,
                                          sqftMin,
                                          sqftMax,
                                          hasPool,
                                          hasGarage,
                                          hasAC,
                                          isSingleStory,
                                          cityView,
                                          mountainView,
                                          waterView,
                                          waterFront,
                                          activeSearch,
                                          setCurrentSearch,
                                          setSort,
                                          setIsSingleFamily,
                                          setIsMultiFamily,
                                          setIsApartment,
                                          setIsCondo,
                                          setIsManufactured,
                                          setIsTownhouse,
                                          setIsLotLand,
                                          setBeds, 
                                          setBaths,
                                          setPriceMin,
                                          setPriceMax,
                                          setMaxHoa,
                                          setSqftMin,
                                          setSqftMax,
                                          setHasPool,
                                          setHasGarage,
                                          setHasAC,
                                          setIsSingleStory,
                                          setCityView,
                                          setMountainView,
                                          setWaterView,
                                          setWaterFront,
                                          setActiveSearch}}>
      {children}
    </SearchFilterContext.Provider>
  )

}
