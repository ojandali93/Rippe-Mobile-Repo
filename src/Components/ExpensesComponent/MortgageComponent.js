import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'
import { InvestmentContext } from '../../Context/InvestmentContext'
import RNPickerSelect from 'react-native-picker-select'

const MortgageComponent = () => {

  const loanOptions = [
    {
      'label': '30 Year Fixed',
      'value': 30
    },
    {
      'label': '15 Year Fixed',
      'value': 15
    }
  ]

  const {property} = useContext(PropertyContext)
  const {mortgage, setMortgage} = useContext(PropertyContext)
  const {homePrice, setHomePrice} = useContext(PropertyContext)
  const {downPaymentAmount, setDownPaymentAmount} = useContext(PropertyContext)
  const {downPaymentPercent, setDownPaymentPercent} = useContext(PropertyContext)
  const {loanAmount, setLoanAmount} = useContext(PropertyContext)
  const {interestRate, setInterestRate} = useContext(PropertyContext)
  const {loanTerm, setLoanTerm} = useContext(PropertyContext)

  const {calculateDownPaymentAmount,
          calculateDownPaymentPercent,
          calculateLoanAmount,
          calculateMortgageAmount,
          calculatePropertyTaxAnnual,
          calculateHomeInsuranceAmount} = useContext(InvestmentContext)

  const updateHomePrice = (value) => {
    setHomePrice(value)
    let newDownPayment = calculateDownPaymentAmount(value, downPaymentPercent)
    let newLoanAmount = calculateLoanAmount(value, newDownPayment)
    setDownPaymentAmount(newDownPayment)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateHDownPaymentAmount = (value) => {
    setDownPaymentAmount(value)
    let newDownPaymentPercent = calculateDownPaymentPercent(homePrice, value)
    let newLoanAmount = calculateLoanAmount(homePrice, value)
    setDownPaymentPercent(newDownPaymentPercent)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateDownPaymentPercent = (value) => {
    value > 0 ? null : value = 0
    setDownPaymentPercent(value)
    let newDownPaymentAmount = calculateDownPaymentAmount(homePrice, value) 
    let newLoanAmount = calculateLoanAmount(homePrice, newDownPaymentAmount)
    setDownPaymentAmount(newDownPaymentAmount)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateInterestRate = (value) => {
    setInterestRate(value)
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, parseFloat(value))
    setMortgage(newMortgageAmount)
  }
  
  const updateLoanTerm = (value) => {
    console.log(value)
    let newIterestRate
    value === 30 ? () => {
      console.log(property.mortgageRates.thirtyYearFixedRate)
      setLoanTerm(30)
      newIterestRate = property.mortgageRates.thirtyYearFixedRate
      setInterestRate(property.mortgageRates.thirtyYearFixedRate) 
      
    } : null
    value === 15 ? () => {
      console.log(property.mortgageRates.fifteenYearFixedRate)
      setLoanTerm(15)
      newIterestRate = property.mortgageRates.fifteenYearFixedRate
      setInterestRate(property.mortgageRates.fifteenYearFixedRate) 
    } : null
    value === 5 ? () => {
      console.log(property.mortgageRates.arm5Rate)
      setLoanTerm(5)
      newIterestRate = property.mortgageRates.arm5Rate
      setInterestRate(property.mortgageRates.arm5Rate) 
    } : null
    console.log(newIterestRate)
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, newIterestRate)
    setMortgage(newMortgageAmount)
  }

  const updateLoanTerms = (value) => {
    console.log(value)
    let newInterestRate
    if(value === 30){
      setLoanTerm(30)
      newInterestRate = property.mortgageRates.thirtyYearFixedRate
      setInterestRate(property.mortgageRates.thirtyYearFixedRate)
    }
    if(value === 15){
      setLoanTerm(15)
      newInterestRate = property.mortgageRates.fifteenYearFixedRate
      setInterestRate(property.mortgageRates.fifteenYearFixedRate)
    }
    console.log(newInterestRate)
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, newInterestRate)
    setMortgage(newMortgageAmount)
  }

  return (
    <View>
      <View>
        <Text>Mortgage: {mortgage}</Text>
      </View>
      <View>
        <Text>
          Home Price: {homePrice}
        </Text>
        <TextInput
          inputMode='decimal'
          value={homePrice.toString()}
          onChangeText={(value) => {updateHomePrice(value)}}
        />
      </View>
      <View>
        <Text>
          Down Payment Amount: {downPaymentAmount}
        </Text>
        <TextInput
          inputMode='decimal'
          value={downPaymentAmount.toString()}
          onChangeText={(value) => {updateHDownPaymentAmount(value)}}
        />
      </View>
      <View>
        <Text>
          Down Payment %: {downPaymentPercent}
        </Text>
        <TextInput
          inputMode='decimal'
          value={downPaymentPercent.toString()}
          onChangeText={(value) => {updateDownPaymentPercent(value)}}
        />
      </View>
      <View>
        <Text>
          Loan Program: 
          {
            loanTerm === 30 ? <Text>30 Year Fixed</Text> : null
          }
          {
            loanTerm === 15 ? <Text>15 Year Fixed</Text> : null
          }
        </Text>
        <RNPickerSelect 
          value={loanTerm}
          onValueChange={(value) => updateLoanTerms(value)}
          items={loanOptions}
        />
      </View>
      <View>
        <Text>
          Interest Rate: {interestRate}
        </Text>
        <TextInput
          inputMode='decimal'
          value={interestRate.toString()}
          onChangeText={(value) => {updateInterestRate(value)}}
        />
      </View>
    </View>
  )
}

export default MortgageComponent