import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { properties, singleProperty } from '../Api/zillow'

import { InvestmentContext } from './InvestmentContext';

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {

  const [propertyList, setPropertyList] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)
  
  // const [counter, setCounter] = useState(0)
  const [resultsLength, setResultsLength] = useState(5)
  const [loading, isLoading] = useState(true)
  let counter = 0

  const {calculateDownPaymentAmount} = useContext(InvestmentContext)
  const {calculateDownPaymentPercent} = useContext(InvestmentContext)
  const {calculateLoanAmount} = useContext(InvestmentContext)
  const {calculateMortgageAmount} = useContext(InvestmentContext)
  const {calculatePropertyTaxAnnual} = useContext(InvestmentContext)
  const {calculateHomeInsuranceAmount} = useContext(InvestmentContext)

  const getProperties = () => {
    console.log('get properties')
    axios.request(properties).then(function (response) {
      // let listResponse = response.data.results
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
    setResultsLength(5)
    makeNewRequest(requestList)
  }

  const makeNewRequest = (requestList) => {
    console.log('making a request')
    console.log('counter: ', counter)
    if(counter < resultsLength){
      console.log('counter: ', counter)
      axios.request(requestList[counter])
        .then((response) => {
          console.log('mortgage rate: ', response.data.mortgageRates.thirtyYearFixedRate)
          console.log('price: ', response.data.price)
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

          // console.log('zpid', response.data.zpid)
          // console.log('down payment $: ', downPaymentAmount)
          // console.log('down payment %: ', downPaymentPercent)
          // console.log('loan amount: ', loanAmount)
          // console.log('mortgage amount: ', mortgageAmount)

          // console.log('monthly tax amount: ', monthlyTaxAmount)
          // console.log('home insurance: ', homeInsurance)
          // console.log('rent estimate: ', monthlyRevenue)
          // console.log('expense amount: ', expenses)
          // console.log('hoa: ', hoaFee)
          
          console.log('NOI: ', netOperatingIncome)
          console.log('Yearly NOI: ', yearlyNetOperatingIncome)
          console.log('CF: ', monthlyCashFLow)
          console.log('Yearly CFt: ', yearlyCashFlow)
          console.log('CAP: ', currentCapRate)
          console.log('CoCR: ', currentCashOnCashReturn)
          console.log('ROI: ', year1ReturnOnInvestment)

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
          console.log('data: ', propertyDetails.investment)
          setPropertyList(propertyList => [...propertyList, propertyDetails])
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

  useEffect(() => {
    console.log(propertyList.length)
  }, [propertyList])
  
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

  // const getSinglePropertyDetails = (zpid) => {
  //   console.log('get single property')
  //   singleProperty.params.zpid = zpid
  //   axios.request(singleProperty).then(function (response) {
  //     // setPropertyList(response.data.results)
  //     console.log(response.data.price)
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // async function sendBatchRequests(urls) {
  //   const requests = urls.map(url => axios.request(url));
  //   axios.all(requests).then((responses) => {
  //     responses.forEach((resp) => {
  //       console.info(resp.data.price);
  //     });
  //   });
  // }