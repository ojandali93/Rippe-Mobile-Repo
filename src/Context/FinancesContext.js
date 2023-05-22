import axios from 'axios'
import React, { createContext, useState } from 'react';

export const FinancesContext = createContext(null)

export const FinancesContextProvider = ({children}) => {

  const [expenses, setExpenses] = useState(0)
  const [expensesNoMotgage, setExpensesNoMortgage] = useState(0)
  const [mortgage, setMortgage] = useState(0)
  const [propertyTax, setPropertyTax] = useState(0)
  const [hoa, setHoa] = useState(0)
  const [mortgageInsurance, setMortgageInsurance] = useState(0)
  const [homeInsurance, setHomeInsurance] = useState(0)
  const [utilities, setutilities] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)

  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    setExpenses(parseInt(mortgage) + 
                parseInt(propertyTax) +
                parseInt(hoa) +
                parseInt(mortgageInsurance) + 
                parseInt(homeInsurance) + 
                parseInt(utilities) + 
                parseInt(otherExpenses))
    setExpensesNoMortgage(parseInt(propertyTax) +
                          parseInt(hoa) +
                          parseInt(mortgageInsurance) + 
                          parseInt(homeInsurance) + 
                          parseInt(utilities) + 
                          parseInt(otherExpenses))
  }, [mortgage, propertyTax, hoa, mortgageInsurance, homeInsurance, utilities, otherExpenses])

  return(
    <FinancesContext.Provider value={{expenses,
                                      expensesNoMotgage,
                                      mortgage,
                                      propertyTax,
                                      hoa,
                                      mortgageInsurance,
                                      homeInsurance,
                                      utilities,
                                      otherExpenses,
                                      revenue,
                                      setExpenses,
                                      setExpensesNoMortgage,
                                      setMortgage,
                                      setPropertyTax,
                                      setHoa,
                                      setMortgageInsurance,
                                      setHomeInsurance,
                                      setutilities,
                                      setOtherExpenses,
                                      setRevenue}}>
      {children}
    </FinancesContext.Provider>
  )

}
