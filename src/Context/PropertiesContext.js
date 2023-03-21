import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';
// import { properties } from '../Api/zillow'

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {

  const [propertyList, setPropertyList] = useState(null)
  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)

  const properties = {
    method: 'GET',
    url: 'https://zillow56.p.rapidapi.com/search',
    params: {location: 'Los Angeles, CA'},
    headers: {
      'X-RapidAPI-Key': 'a97aa2b01cmshc498c17349ddc7dp1a33e4jsn12bb4ad9c5c9',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
    }
  };

  const getProperties = () => {
    console.log('get properties')
    axios.request(properties).then(function (response) {
      setPropertyList(response.data.results)
      setResultsPerPage(response.data.resultsPerPage)
      setTotalPages(response.data.totalPages)
      setTotalResultsCount(response.data.totalResultCount)
      findProperty()
    }).catch(function (error) {
      console.log(error);
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