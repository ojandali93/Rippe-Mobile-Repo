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
    setLoading(true)
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
      setTotalPages(response.data.totalPages)
      setRefreshMap(true)
      setCityLat(response.data.results[0].latitude)
      setCityLong(response.data.results[0].longitude)
      setRefreshMap(false)
      grabFavorites()
      response.data.abbreviatedAddress != null
        ? null 
        : grabMoreDetails(response.data)
    }).catch(function (error) {
        error[0] === 'AxiosError: Request failed with status code 500'
          ? setErrorMessage('There was an issue retreiving properties')
          : null
    });
  }

  const grabMoreDetails = (generalResponse) => {
    axios.post('https://api.precisely.com/oauth/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic RGdIYnVyRjNPdlllVEdKYWxtUUdveUd3NTR6VzNjUVk6N3lhQlRsT01CQTdqcXJrbQ==',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
      setPropertyDetails(response.data.access_token, generalResponse)
    })
    .catch((error) => {
      console.log('token error: ', error)
    })
  }

  const setPropertyDetails = (token, generalResponse) => {
    let limit = 31
    generalResponse.results.map((property, index) => {
      if(index < limit){
        let taxRate
        let propertyAddress = property.streetAddress + ", " +
                              property.city + ', ' +
                              property.state + ' ' + property.zipcode
        axios.get('https://api.precisely.com/property/v2/attributes/byaddress', {
          params: {
            address: propertyAddress,
            attributes: 'taxAmount, assessedValue'
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then((response) => {
          taxRate = ((parseInt(response.data.propertyAttributes.taxAmount) / parseInt(response.data.propertyAttributes.assessedValue)) * 100).toFixed(2)
          let downPaymentAmount = calculateDownPaymentAmount(property.price, 20)
          let downPaymentPercent = calculateDownPaymentPercent(property.price, downPaymentAmount)
          let loanAmount = calculateLoanAmount(property.price, downPaymentAmount)
          let mortgageAmount = calculateMortgageAmount(loanAmount, 30, 6.485)
          let monthlyTaxAmount = Math.round((calculatePropertyTaxAnnual(taxRate, property.price)) / 12)
          let homeInsurance = calculateHomeInsuranceAmount(property.price)
          let monthlyRevenue = property.rentZestimate
          let expenses = 0
          let hoaFee = property.hoaFee
          hoaFee === null 
            ? expenses = mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance 
            : expenses = mortgageAmount + monthlyTaxAmount + homeInsurance
          let monthlyExpenses = 0
          let monthlyExpensesWithoutMortgage = 0
          hoaFee === null
            ? monthlyExpensesWithoutMortgage = hoaFee + monthlyTaxAmount + homeInsurance
            : monthlyExpensesWithoutMortgage = monthlyTaxAmount + homeInsurance
          hoaFee === null
            ? monthlyExpenses = mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance
            : monthlyExpenses = mortgageAmount + monthlyTaxAmount + homeInsurance
          let netOperatingIncome = Math.round(monthlyRevenue - monthlyExpensesWithoutMortgage)
          let yearlyNetOperatingIncome = netOperatingIncome * 12
          let monthlyCashFLow = Math.round(netOperatingIncome - mortgageAmount)
          let yearlyCashFlow = monthlyCashFLow * 12
          let currentCapRate = ((yearlyNetOperatingIncome / property.price) * 100).toFixed(2)
          let currentCashOnCashReturn = ((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2)
          let year1ReturnOnInvestment = ((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2)
  
          property.investment = {
            downPaymentAmount: downPaymentAmount,
            downPaymentPercent: downPaymentPercent,
            loanAmount: loanAmount,
            mortgageAmount: mortgageAmount,
            monthlyTaxAmount: monthlyTaxAmount,
            homeInsurance: homeInsurance,
            monthlyRevenue: monthlyRevenue,
            expenses: expenses,
            netOperatingIncome: netOperatingIncome,
            yearlyNetOperatingIncome: yearlyNetOperatingIncome,
            monthlyCashFLow: monthlyCashFLow,
            yearlyCashFlow: yearlyCashFlow,
            currentCapRate: currentCapRate,
            currentCashOnCashReturn: currentCashOnCashReturn,
            year1ReturnOnInvestment: year1ReturnOnInvestment,
            monthlyExpensesWithoutMortgage: monthlyExpensesWithoutMortgage,
          }
          setResults(results => [...results, property])
        })
        .catch((error) => {
          console.log('property error: ', error)
        })
      }
    })
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
                                        refreshMap,
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