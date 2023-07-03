import authorized from '../../Authorize'
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { properties, singleProperty } from '../Api/zillowApi'

import { SearchFilterContext } from './SearchFilterContext';
import { ProfileContext } from './ProfileContext';

import { calculateDownPaymentAmount,
         calculateDownPaymentPercent,
         calculateLoanAmount,
         calculateMortgageAmount,
         calculatePropertyTaxAnnual,
         calculateHomeInsuranceAmount,
         getStateName} from '../../utilities';

import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from './FavoritesContext';

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {
  const navigation = useNavigation()

  const {
    grabFavorites
  } = useContext(FavoritesContext)

  const [results, setResults] = useState([])

  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [loading, setLoading] = useState(true)

  const [currentSearch, setCurrentSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('Los Angeles, CA')

  const [singlePropertyFound, setSinglePropertyFound] = useState(false)
  
  const [tempToken, setTempToken] = useState(null)

  const [viewMaps, setViewMaps] = useState(false)
  const [cityLat, setCityLat] = useState(34.052235)
  const [cityLong, setCityLong] = useState(-118.243683)
  const [favoritesZpid, setFavoritesZpid] = useState([])
  const [refreshMap, setRefreshMap] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [invalidLocation, setInvalidLocation] = useState(false)
  
  const {sort, setSort} = useContext(SearchFilterContext)
  const {isSingleFamily} = useContext(SearchFilterContext)
  const {isMultiFamily} = useContext(SearchFilterContext)
  const {isApartment} = useContext(SearchFilterContext)
  const {isCondo} = useContext(SearchFilterContext)
  const {isManufactured} = useContext(SearchFilterContext)
  const {isTownhouse} = useContext(SearchFilterContext)

  const {beds} = useContext(SearchFilterContext)
  const {baths} = useContext(SearchFilterContext)
  const {priceMin} = useContext(SearchFilterContext)
  const {priceMax} = useContext(SearchFilterContext)
  const {maxHoa} = useContext(SearchFilterContext)
  const {sqftMin} = useContext(SearchFilterContext)
  const {sqftMax} = useContext(SearchFilterContext)

  const {hasPool} = useContext(SearchFilterContext)
  const {hasGarage} = useContext(SearchFilterContext)
  const {hasAC} = useContext(SearchFilterContext)
  const {isSingleStory} = useContext(SearchFilterContext)

  const {cityView} = useContext(SearchFilterContext)
  const {mountainView} = useContext(SearchFilterContext)
  const {waterView} = useContext(SearchFilterContext)
  const {waterFront} = useContext(SearchFilterContext)

  const getProperties = () => {
    setInvalidLocation(false)
    setLoading(true)
    // getAccessToken()
    currentSearch === '' ? null : activeSearch === currentSearch ? null : setActiveSearch(currentSearch)
    currentSearch === ''
      ? activeSearch === '' 
        ? properties.params.location = 'Los Angeles, CA'
        : properties.params.location = activeSearch
      : properties.params.location = currentSearch
    priceMin === null
      ? null 
      : properties.params.price_min = priceMin
    priceMax === null
      ? null 
      : properties.params.price_max = priceMax
    maxHoa === null
      ? null 
      : properties.params.hoa_max = maxHoa
    sqftMin === null
      ? null 
      : properties.params.sqft_min = sqftMin
    sqftMax === null
      ? null 
      : properties.params.sqft_max = sqftMax
    beds === null
      ? null 
      : properties.params.beds_min = beds
    baths === null
      ? null 
      : properties.params.baths_min = baths
    hasPool === false 
      ? null 
      : properties.params.hasPool = hasPool
    hasGarage === false 
      ? null 
      : properties.params.hasGarage = hasGarage 
    hasAC === false 
      ? null 
      : properties.params.hasAirConditioning = hasAC
    isSingleStory === false 
      ? null 
      : properties.params.singleStory = isSingleStory
    cityView === false 
      ? null 
      : properties.params.isCityView = cityView
    mountainView === false 
      ? null 
      : properties.params.isMountainView = mountainView
    waterView === false
      ? null 
      : properties.params.isWaterView = waterView
    waterFront === false 
      ? null 
      : properties.params.isWaterfront = waterFront
    properties.params.isSingleFamily = isSingleFamily
    properties.params.isMultiFamily = isMultiFamily
    properties.params.isApartment = isApartment
    properties.params.isCondo = isCondo
    properties.params.isManufactured = isManufactured
    properties.params.isTownhouse = isTownhouse
    properties.params.page = currentPage
    properties.params.sortSelection = sort
    axios.request(properties)
    .then(function (response) {
      response.data.error
        ? getInvalidLocaiton()
        : null
      response.data.abbreviatedAddress
        ? navigation.navigate('PropertyScreen', {zpid: response.data.zpid})
        : null
      setTotalPages(response.data.totalPages)
      // setRefreshMap(true)
      // setCityLat(response.data.results[0].latitude)
      // setCityLong(response.data.results[0].longitude)
      // setRefreshMap(false)
      grabFavorites()
      setResults(response.data.results)
      setLoading(false)
    }).catch(function (error) {
        error[0] === 'AxiosError: Request failed with status code 500'
          ? setErrorMessage('There was an issue retreiving properties')
          : getProperties()
    });
  }

  const getAccessToken = () => {
    axios.post('https://api.precisely.com/oauth/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic RGdIYnVyRjNPdlllVEdKYWxtUUdveUd3NTR6VzNjUVk6N3lhQlRsT01CQTdqcXJrbQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
      setAccessToken(response.data.access_token)
    })
    .catch((error) => {
      console.log('token error: ', error)
    })
  }

  const getInvalidLocaiton = () => {
    setInvalidLocation(true)
    setLoading(false)
  }

  return(
    <PropertiesContext.Provider value={{results,
                                        resultsPerPage,
                                        totalPages,
                                        totalResultsCount,
                                        loading,
                                        viewMaps,
                                        loading,
                                        cityLat, 
                                        cityLong,
                                        currentPage,
                                        singleProperty,
                                        activeSearch, 
                                        currentSearch,
                                        singlePropertyFound,
                                        accessToken,
                                        refreshMap,
                                        invalidLocation,
                                        errorMessage,
                                        setResults,
                                        setResultsPerPage,
                                        setTotalPages,
                                        setTotalResultsCount,
                                        getProperties,
                                        setViewMaps,
                                        setLoading,
                                        setCurrentPage,
                                        setActiveSearch,
                                        setCurrentSearch,
                                        setSinglePropertyFound}}>
      {children}
    </PropertiesContext.Provider>
  )

}