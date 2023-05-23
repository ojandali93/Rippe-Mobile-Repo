import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react';

export const FinancesContext = createContext(null)

export const FinancesContextProvider = ({children}) => {

  const [price, setPrice] = useState(0)

  const [expenses, setExpenses] = useState(0)
  const [expensesNoMotgage, setExpensesNoMortgage] = useState(0)
  const [mortgage, setMortgage] = useState(0)
  const [dpAmount, setDbAmount] = useState(0)
  const [propertyTax, setPropertyTax] = useState(0)
  const [hoa, setHoa] = useState(0)
  const [mortgageInsurance, setMortgageInsurance] = useState(0)
  const [homeInsurance, setHomeInsurance] = useState(0)
  const [utilities, setUtilities] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)

  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [yearlyRevenue, setYearlyRevenue] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)
  const [yearlyExpenses, setYearlyExpenses] = useState(0)
  const [monthlyNOI, setMonthlyNOI] = useState(0)
  const [yearlyNOI, setYearlyNOI] = useState(0)
  const [monthlyCF, setMonthlyCF] = useState(0)
  const [yearlyCf, setYearlyCF] = useState(0)
  const [capRate, setCapRate] = useState(0)
  const [CashOnCashReturn, setCashOnCashReturn] = useState(0)
  const [roi, setRoi] = useState(0)

  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    setExpenses(parseInt(mortgage) + 
                parseInt(propertyTax) +
                parseInt(hoa) +
                parseInt(mortgageInsurance) + 
                parseInt(Math.round(homeInsurance/12)) + 
                parseInt(utilities) + 
                parseInt(otherExpenses))
    setExpensesNoMortgage(parseInt(propertyTax) +
                          parseInt(hoa) +
                          parseInt(mortgageInsurance) + 
                          parseInt(Math.round(homeInsurance/12)) + 
                          parseInt(utilities) + 
                          parseInt(otherExpenses))
  }, [mortgage, propertyTax, hoa, mortgageInsurance, homeInsurance, utilities, otherExpenses])

  return(
    <FinancesContext.Provider value={{expenses,
                                      expensesNoMotgage,
                                      mortgage,
                                      dpAmount,
                                      propertyTax,
                                      hoa,
                                      mortgageInsurance,
                                      homeInsurance,
                                      utilities,
                                      otherExpenses,
                                      totalRevenue,
                                      monthlyRevenue,
                                      yearlyRevenue,
                                      monthlyExpenses,
                                      yearlyExpenses,
                                      monthlyNOI,
                                      yearlyNOI,
                                      monthlyCF,
                                      yearlyCf,
                                      capRate,
                                      CashOnCashReturn,
                                      roi,
                                      setExpenses,
                                      setExpensesNoMortgage,
                                      setMortgage,
                                      setDbAmount,
                                      setPropertyTax,
                                      setHoa,
                                      setMortgageInsurance,
                                      setHomeInsurance,
                                      setUtilities,
                                      setOtherExpenses,
                                      setTotalRevenue,
                                      setMonthlyRevenue,
                                      setYearlyRevenue,
                                      setMonthlyExpenses,
                                      setYearlyExpenses,
                                      setMonthlyNOI,
                                      setYearlyNOI,
                                      setMonthlyCF,
                                      setYearlyCF,
                                      setCapRate,
                                      setCashOnCashReturn,
                                      setRoi,
                                      setPrice}}>
      {children}
    </FinancesContext.Provider>
  )

}
