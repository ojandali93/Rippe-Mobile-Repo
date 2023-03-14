import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

import { properties } from '../Api/Zillow'

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {

  const [propertyList, setPropertyList] = useState(null)
  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)

  const getProperties = () => {
    axios.request(properties).then(function (response) {
      setPropertyList(response.data.results)
      setResultsPerPage(response.data.resultsPerPage)
      setTotalPages(response.data.totalPages)
      setTotalResultsCount(response.data.totalResultCount)
    }).catch(function (error) {
      console.error(error);
    });
  }

  return(
    <PropertiesContext.Provider value={{propertyList,
                                        resultsPerPage,
                                        totalPages,
                                        totalResultsCount,
                                        setPropertyList,
                                        setResultsPerPage,
                                        setTotalPages,
                                        setTotalResultsCount,
                                        getProperties}}>
      {children}
    </PropertiesContext.Provider>
  )

}