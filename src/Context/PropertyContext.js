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
  const [propertyTaxRate, setPropertyTaxRate] = useState(0)
  const [hoa, setHoa] = useState(0)
  const [homeInsurance, setHomeInsurance] = useState(0)
  const [utilities, setUtilities] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)

  const [homePrice, setHomePrice] = useState(0)
  const [downPaymentAmount, setDownPaymentAmount] = useState(0)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanAmount, setLoanAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [loanTerm, setLoanTerm] = useState(0)

  const [water, setWater] = useState(0)
  const [trash, setTrash] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [gas, setGas] = useState(0)

  const [maintenance, setMaintenance] = useState(0)
  const [management, setManagement] = useState(0)
  const [repairs, setRepairs] = useState(0)
  const [homeWarranty, setHomeWarranty] = useState(0)
  const [other, setOther] = useState(0)

  const [loading, setLoading] = useState(false)

  const setPropertyDetails = () => {
    setLoading(true)
    setMainImage(property.hiResImageLink)
    setImages(property.big)
    setLoading(false)
    setRevenue(property.rentZestimate)
    setHomePrice(property.price)
    setInterestRate(property.mortgageRates.thirtyYearFixedRate)
    setLoanTerm(30)
    setPropertyTaxRate(property.propertyTaxRate)
    setPropertyTax(Math.round((property.propertyTaxRate/100) * property.price))
    setLoanAmount(Math.round(property.price * (1 - (downPaymentPercent / 100))))
    property.resoFacts.hoaFee === null ? setHoa(0) : setHoa(property.resoFacts.hoaFee)
  }

  useEffect(() => {
    parseInt(downPaymentPercent) < 20
      ? setHomeInsurance(Math.round((loanAmount * 0.0058) / 12)) : setHomeInsurance(0)
  }, [downPaymentPercent])

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(electricity) + parseInt(trash) + parseInt(water))
  }, [gas, electricity, trash, water])

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
                                      propertyTax,
                                      propertyTaxRate,
                                      homeInsurance,
                                      hoa, 
                                      water, 
                                      electricity, 
                                      gas, 
                                      trash,
                                      utilities,
                                      maintenance,
                                      management,
                                      repairs,
                                      homeWarranty,
                                      other,
                                      otherExpenses,
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
                                      setInterestRate,
                                      setPropertyTax,
                                      setPropertyTaxRate,
                                      setHomeInsurance,
                                      setHoa,
                                      setTrash,
                                      setGas,
                                      setWater,
                                      setElectricity,
                                      setUtilities,
                                      setMaintenance,
                                      setManagement,
                                      setRepairs,
                                      setHomeWarranty,
                                      setOther,
                                      setOtherExpenses}}>
      {children}
    </PropertyContext.Provider>
  )

}