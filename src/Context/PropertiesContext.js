import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { properties, singleProperty } from '../Api/zillowApi'

import { InvestmentContext } from './InvestmentContext';
import { SearchFilterContext } from './SearchFilterContext';

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {

  const [results, setResults] = useState([])

  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [loading, setLoading] = useState(true)
  // const [resultsLength, setResultsLength] = useState(2)
  
  let resultsLength = 2
  let counter = 0

  const [viewMaps, setViewMaps] = useState(false)
  const [cityLat, setCityLat] = useState(118.2437)
  const [cityLong, setCityLong] = useState(34.0522)
  
  const {calculateDownPaymentAmount} = useContext(InvestmentContext)
  const {calculateDownPaymentPercent} = useContext(InvestmentContext)
  const {calculateLoanAmount} = useContext(InvestmentContext)
  const {calculateMortgageAmount} = useContext(InvestmentContext)
  const {calculatePropertyTaxAnnual} = useContext(InvestmentContext)
  const {calculateHomeInsuranceAmount} = useContext(InvestmentContext)
  
  const {currentSearch, setCurrentSearch} = useContext(SearchFilterContext)
  const {activeSearch, sort} = useContext(SearchFilterContext)
  const {isSingleFamily} = useContext(SearchFilterContext)
  const {isMultiFamily} = useContext(SearchFilterContext)
  const {isApartment} = useContext(SearchFilterContext)
  const {isCondo} = useContext(SearchFilterContext)
  const {isManufactured} = useContext(SearchFilterContext)
  const {isTownhouse} = useContext(SearchFilterContext)
  const {isLotLand} = useContext(SearchFilterContext)

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
    console.log('getting properties')
    setLoading(true)
    activeSearch === ''
      ? currentSearch === '' 
        ? properties.params.location = 'Los Angeles, CA'
        : properties.params.location = currentSearch
      : properties.params.location = activeSearch
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
    properties.params.sortSelection = sort
    properties.params.isSingleFamily = isSingleFamily
    properties.params.isMultiFamily = isMultiFamily
    properties.params.isApartment = isApartment
    properties.params.isCondo = isCondo
    properties.params.isManufactured = isManufactured
    properties.params.isTownhouse = isTownhouse
    properties.params.page = currentPage
    console.log('active', activeSearch)
    console.log('current', currentSearch)
    console.log(properties)
    axios.request(properties).then(function (response) {
      console.log('success')
      setCityLat(response.data.results[0].latitude)
      setCityLong(response.data.results[0].longitude)
      setTotalPages(response.data.totalPages)
      generateUrlList(response.data.results)
    }).catch(function (error) {
      console.error('there was an issue')
      console.log(error);
    });
  }

  const generateUrlList = (results) => {
    const requestList = []
    for(let i = 0; i < results.length; i++){
      let requestObject = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/property',
        params: {zpid: results[i].zpid},
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '015b41c917msh3247c85d232d717p128b80jsnd5d43cba3ec3',
          'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
      };
      requestList.push(requestObject)
    }
    makeNewRequest(requestList)
  }
  
  const makeNewRequest = (requestList) => {
    if(counter < resultsLength){
      axios.request(requestList[counter])
        .then((response) => {
          let downPaymentAmount = calculateDownPaymentAmount(response.data.price, 20)
          let downPaymentPercent = calculateDownPaymentPercent(response.data.price, downPaymentAmount)
          let loanAmount = calculateLoanAmount(response.data.price, downPaymentAmount)
          let mortgageAmount = calculateMortgageAmount(loanAmount, 30, response.data.mortgageRates.thirtyYearFixedRate)
          let monthlyTaxAmount = calculatePropertyTaxAnnual(response.data.propertyTaxRate, response.data.price)
          let homeInsurance = calculateHomeInsuranceAmount(response.data.price)
          let monthlyRevenue = response.data.rentZestimate
          let expenses = 0
          let hoaFee = response.data.hoaFee
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
          let currentCapRate = ((yearlyNetOperatingIncome / response.data.price) * 100).toFixed(2)
          let currentCashOnCashReturn = ((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2)
          let year1ReturnOnInvestment = ((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2)

          let propertyDetails = response.data
          propertyDetails.investment = {
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
          setResults(results => [...results, propertyDetails])
          setLoading(false)
          setCurrentSearch('')
          counter++
          makeNewRequest(requestList)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      counter = 0
    }
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
                                        setResults,
                                        setResultsPerPage,
                                        setTotalPages,
                                        setTotalResultsCount,
                                        getProperties,
                                        setViewMaps,
                                        setLoading,
                                        setCurrentPage}}>
      {children}
    </PropertiesContext.Provider>
  )

}