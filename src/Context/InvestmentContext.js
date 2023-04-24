import axios from 'axios'
import React, { createContext, useContext, useState } from 'react';

export const InvestmentContext = createContext(null)

export const InvestmentContextProvider = ({children}) => {
  
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(0)
  const [grossMonthlyExpenses, setGrossMonthlyExpenses] = useState(0)
  const [grossYearlyIncome, setGrossYearlyIncome] = useState(0)
  const [grossYearlyExpenses, setGrossYearlyExpenses] = useState(0)
  const [monthlyNetOperatingIncome, setMonthlyNetOperatingIncome] = useState(0)
  const [yearlyNetOperatingIncome, setYearlyNetOperatingIncome] = useState(0)
  const [monthlyCashFlow, setMonthlyCashFlow] = useState(0)
  const [yearlyCashFlow, setYearlyCashFlow] = useState(0)
  const [capRate, setCapRate] = useState(0)
  const [cashOnCashReturn, setCashOnCashReturn] = useState(0)
  const [yearReturnOnInvestment, setYearReturnOnInvestment] = useState(0)

  const [expensesWithoutMortgage, setExpensesWithoutMortgage] = useState(0)

  const calculateMonthlyNetOperatingIncome = (totalRevenue, expensesWithoutMortgage) => {
    setMonthlyNetOperatingIncome(totalRevenue - expensesWithoutMortgage)  
  }

  const calculateYearlyNetOperatingIncome = (monthlyNetOperatingIncome) => {
    setYearlyNetOperatingIncome(monthlyNetOperatingIncome * 12)  
  }

  const calculateMonthlyCashFlow = (monthlyNetOperatingIncome, mortgage) => {
    setMonthlyCashFlow(monthlyNetOperatingIncome - mortgage)
  }

  const calculateYearlyCashFlow = (monthlyCashFlow) => {
    setYearlyCashFlow(monthlyCashFlow * 12)
  }

  const calculateCapRate = (yearlyNetOperatingIncome, price) => {
    setCapRate(((yearlyNetOperatingIncome/price) * 100).toFixed(2))
  }

  const calculateCashOnCashReturn = (yearlyCashFlow, downPaymentAmount) => {
    setCashOnCashReturn(((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2))
  }

  const calculateYearReturnOnInvestment = (yearlyNetOperatingIncome, downPaymentAmount) => {
    setYearReturnOnInvestment(((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2))
  }

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
    <InvestmentContext.Provider value={{grossMonthlyIncome,
                                        grossMonthlyExpenses,
                                        grossYearlyIncome, 
                                        grossYearlyExpenses,
                                        monthlyNetOperatingIncome,
                                        yearlyNetOperatingIncome,
                                        monthlyCashFlow,
                                        yearlyCashFlow,
                                        capRate,
                                        cashOnCashReturn,
                                        yearReturnOnInvestment,
                                        expensesWithoutMortgage,
                                        setGrossMonthlyIncome,
                                        setGrossMonthlyExpenses,
                                        setGrossYearlyIncome,
                                        setGrossYearlyExpenses,
                                        calculateMonthlyNetOperatingIncome,
                                        calculateYearlyNetOperatingIncome,
                                        calculateMonthlyCashFlow,
                                        calculateYearlyCashFlow,
                                        calculateCapRate,
                                        calculateCashOnCashReturn,
                                        calculateYearReturnOnInvestment,
                                        setExpensesWithoutMortgage,
                                        calculateDownPaymentAmount,
                                        calculateDownPaymentPercent,
                                        calculateLoanAmount,
                                        calculateMortgageAmount,
                                        calculatePropertyTaxAnnual,
                                        calculateHomeInsuranceAmount}}>
      {children}
    </InvestmentContext.Provider>
  )

}
