import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';

export const PropertyContext = createContext(null)

export const PropertyContextProvider = ({children}) => {

  const [property, setProperty] = useState('')

  const [mainImage, setMainImage] = useState('')
  const [images, setImages] = useState([])

  const [revenue, setRevenue] = useState(0)
  const [additionalRevenue, setAdditionalRevenue] = useState(0)

  const [mortgage, setMortgage] = useState(0)
  const [mortgageInsurance, setMortgageInsurance] = useState(0)
  const [propertyTax, setPropertyTax] = useState(0)
  const [hoa, setHoa] = useState(0)
  const [homeInsurance, setHomeInsurance] = useState(0)
  const [utilities, setUtilities] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)

  const [homePrice, setHomePrice] = useState(0)
  const [downPaymentAmount, setDownPaymentAmount] = useState(0)
  const [downPaymentPercent, setDownPaymentPercent] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [loanTerm, setLoanTerm] = useState(0)

  const [loading, setLoading] = useState(false)

  const setPropertyDetails = () => {
    setLoading(true)
    setMainImage(property.hiResImageLink)
    setImages(property.big)
    setLoading(false)
    setRevenue(property.rentZestimate)
    setHomePrice(property.price)
    setDownPaymentPercent(20)
    setInterestRate(property.mortgageRates.thirtyYearFixedRate)
    setLoanTerm(30)
  }

  return(
    <PropertyContext.Provider value={{property, 
                                      loading, 
                                      mainImage, 
                                      images,
                                      revenue,
                                      additionalRevenue,
                                      mortgage,
                                      homePrice,
                                      downPaymentAmount,
                                      downPaymentPercent,
                                      loanAmount, 
                                      interestRate, 
                                      loanTerm,
                                      setProperty, 
                                      setPropertyDetails,
                                      setMainImage,
                                      setRevenue,
                                      setAdditionalRevenue,
                                      setMortgage,
                                      setHomePrice,
                                      setDownPaymentAmount,
                                      setDownPaymentPercent,
                                      setLoanAmount,
                                      setLoanTerm,
                                      setInterestRate}}>
      {children}
    </PropertyContext.Provider>
  )

}