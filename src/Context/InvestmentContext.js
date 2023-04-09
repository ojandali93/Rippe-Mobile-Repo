import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

export const InvestmentContext = createContext(null)

export const InvestmentContextProvider = ({children}) => {
  
  const calculateDownPaymentAmount = (homePrice, downPaymentPercent) => {
    return Math.round(homePrice * (downPaymentPercent / 100))
  }
  
  const calculateLoanAmount = (homePrice, downPaymentAmount) => {
    return (homePrice - downPaymentAmount)
  }
  
  const calculateDownPaymentPercent = (homePrice, downPaymentAmount) => {
    return Math.round((downPaymentAmount / homePrice) * 100)
  }
  
  const calculateMortgageAmount = (loanAmount, loanYears, interestRate) => {
    let interest = (interestRate / 100) / 12
    let powerRate = Math.pow(1 + interest, (loanYears * 12))
    let monthlyPayment = loanAmount * ((interest * powerRate) / (powerRate - 1))
    return Math.round(monthlyPayment)
  }

  const calculatePropertyTaxAnnual = (taxRate, propertyValue) => {
    let annualTaxAmount = propertyValue * (taxRate / 100)
    let monthlyTaxAmount = Math.round(annualTaxAmount/12)
    return monthlyTaxAmount
  }

  const calculateHomeInsuranceAmount = (price) => {
    let initialPrice = Math.round(price / 1000)
    let annualValue = Math.round(initialPrice * 3.5)
    return Math.round(annualValue/12)
  }

  
  
  return(
    <InvestmentContext.Provider value={{calculateDownPaymentAmount,
                                        calculateDownPaymentPercent,
                                        calculateLoanAmount,
                                        calculateMortgageAmount,
                                        calculatePropertyTaxAnnual,
                                        calculateHomeInsuranceAmount}}>
      {children}
    </InvestmentContext.Provider>
  )

}
