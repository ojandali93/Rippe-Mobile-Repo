import axios from 'axios'
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
  
  const [loading, setLoading] = useState(true)
  // const [resultsLength, setResultsLength] = useState(2)
  
  let resultsLength = 2
  let counter = 0

  const {calculateDownPaymentAmount} = useContext(InvestmentContext)
  const {calculateDownPaymentPercent} = useContext(InvestmentContext)
  const {calculateLoanAmount} = useContext(InvestmentContext)
  const {calculateMortgageAmount} = useContext(InvestmentContext)
  const {calculatePropertyTaxAnnual} = useContext(InvestmentContext)
  const {calculateHomeInsuranceAmount} = useContext(InvestmentContext)

  const {currentSearch, sort} = useContext(SearchFilterContext)

  const getProperties = () => {
    setLoading(true)
    currentSearch === '' 
      ? properties.params.location = 'Los Angeles, CA' 
      : properties.params.location = currentSearch
    properties.params.sortSelection = sort
    console.log(properties)
    axios.request(properties).then(function (response) {
      generateUrlList(response.data.results)
    }).catch(function (error) {
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
          'X-RapidAPI-Key': 'a97aa2b01cmshc498c17349ddc7dp1a33e4jsn12bb4ad9c5c9',
          'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
      }
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
                                        setResults,
                                        setResultsPerPage,
                                        setTotalPages,
                                        setTotalResultsCount,
                                        getProperties}}>
      {children}
    </PropertiesContext.Provider>
  )

}