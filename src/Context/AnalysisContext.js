import axios from 'axios'
import React, { createContext, useState } from 'react';
import { rentalRatesA, rentalRatesT, 
         cityTrends, topRatedHomes, newlyLlisted } from '../Api/zillowApi';

export const AnalysisContext = createContext(null)

export const AnalysisContextProvider = ({children}) => {

  const [currentSearch, setCurrentSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('Los Angeles, CA')

  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const [citySummary, setCitySummary] = useState({})

  const [airbnbRentalRates, setAirbnbRentalRates] = useState({})
  const [traditionalRentalRates, setTraditonalRentalRouts] = useState({})
  const [topRatedListings, setTopRatedListings] = useState({})
  const [newlyListed, setNewlyListed] = useState({})

  const [loading, setLoading] = useState(true)

  const getRentalRates = () => {
    currentSearch === '' ? null : setActiveSearch(currentSearch)
    let search = activeSearch 
    let cityStateSplit = search.split(', ')
    let updatedCity = cityStateSplit[0]
    let newState = cityStateSplit[1]
    rentalRatesA.params.city = updatedCity 
    rentalRatesA.params.state = newState
    axios.request(rentalRatesA)
      .then((response) => {
        setAirbnbRentalRates(response.data.content.retnal_rates)
        getTranditionalRentalRates()
      })
      .catch((error) => {
        console.log('rental rate: ', error)
      })
  }

  const getTranditionalRentalRates = () => {
    currentSearch === '' ? null : setActiveSearch(currentSearch)
    let search = activeSearch 
    let cityStateSplit = search.split(', ')
    let updatedCity = cityStateSplit[0]
    let newState = cityStateSplit[1]
    rentalRatesT.params.city = updatedCity 
    rentalRatesT.params.state = newState
    axios.request(rentalRatesT)
      .then((response) => {
        setTraditonalRentalRouts(response.data.content.retnal_rates)
        getTopRatedHomes()
      })
      .catch((error) => {
        console.log('rental rate traditional: ', error)
      })
  }

  const getTopRatedHomes = () => {
    currentSearch === '' ? null : setActiveSearch(currentSearch)
    let search = activeSearch 
    let cityStateSplit = search.split(', ')
    let updatedCity = cityStateSplit[0]
    let newState = cityStateSplit[1]
    topRatedHomes.params.city = updatedCity 
    topRatedHomes.params.state = newState
    axios.request(topRatedHomes)
      .then((response) => {
        setTopRatedListings(response.data.content.list)
        getNewlyListed()
      })
      .catch((error) => {
        console.log('top rated: ', error)
      })
  }

  const getNewlyListed = () => {
    currentSearch === '' ? null : setActiveSearch(currentSearch)
    let search = activeSearch 
    let cityStateSplit = search.split(', ')
    let updatedCity = cityStateSplit[0]
    let newState = cityStateSplit[1]
    newlyLlisted.params.city = updatedCity 
    newlyLlisted.params.state = newState
    axios.request(newlyLlisted)
      .then((response) => {
        setNewlyListed(response.data.content.list)
        console.log('have all items')
        setLoading(false)
      })
      .catch((error) => {
        console.log('top rated: ', error)
      })
  }


  const submitRequest = () => {
    currentSearch === '' ? null : setActiveSearch(currentSearch)
    let search = activeSearch 
    let cityStateSplit = search.split(', ')
    let newCity = cityStateSplit[0].replace(' ', '%20')
    let updatedCity = cityStateSplit[0]
    let newState = cityStateSplit[1]
    setCity(updatedCity)
    setState(newState)
    cityTrends.url = 'https://mashvisor-api.p.rapidapi.com/trends/summary/' + 
                      newState + '/' + newCity
    axios.request(cityTrends)
      .then((response) => {
        setCitySummary(response.data.content)
        getRentalRates()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return(
    <AnalysisContext.Provider value={{activeSearch,
                                      citySummary,
                                      airbnbRentalRates,
                                      traditionalRentalRates,
                                      currentSearch, 
                                      topRatedListings,
                                      newlyListed,
                                      loading,
                                      setCurrentSearch,
                                      submitRequest}}>
      {children}
    </AnalysisContext.Provider>
  )

}
