import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { PropertyContext } from '../../../Context/PropertyContext'
import { FinancesContext } from '../../../Context/FinancesContext'
import { calculateDownPaymentAmount,
          calculateDownPaymentPercent,
          calculateLoanAmount,
          calculateMortgageAmount } from '../../../../utilities' 

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16

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
  const {mortgage, setMortgage} = useContext(FinancesContext)
  const {dpAmount, setDbAmount} = useContext(FinancesContext)

  const [homePrice, setHomePrice] = useState(property.price)
  const [downPaymentAmount, setDownPaymentAmount] = useState(Math.round(property.price * .2))
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanAmount, setLoanAmount] = useState(Math.round(property.price * .8))
  const [interestRate, setInterestRate] = useState(property.mortgageRates.thirtyYearFixedRate)
  const [loanTerm, setLoanTerm] = useState(30)
  const [currentMortgage, setCurrentMortgage] = useState(calculateMortgageAmount(Math.round(property.price * .8), loanTerm, interestRate))

  useEffect(() => {
    setMortgage(currentMortgage)
    setDbAmount(downPaymentAmount)
  }, [])

  const updateHomePrice = (value) => {
    setHomePrice(value)
    let newDownPayment = calculateDownPaymentAmount(value, downPaymentPercent)
    let newLoanAmount = calculateLoanAmount(value, newDownPayment)
    setDownPaymentAmount(newDownPayment)
    setDbAmount(newDownPayment)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateHDownPaymentAmount = (value) => {
    setDownPaymentAmount(value)
    setDbAmount(value)
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
    let newLoanAmount = calculateLoanAmount(homePrice, newDownPaymentAmount).
    setDbAmount(newDownPaymentAmount)
    setDownPaymentAmount(newDownPaymentAmount)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateInterestRate = (value) => {
    setInterestRate(value)
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, parseFloat(value))
    setMortgage(newMortgageAmount)
  }

  const updateLoanTerms = (value) => {
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
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, newInterestRate)
    setMortgage(newMortgageAmount)
  }

  return (
    <View style={styles.container}>
      <View style={styles.mortgageAContainer}>
        <Text style={styles.mortgageAText}>Mortgage: ${mortgage}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Home Price:
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={homePrice.toString()}
          onChangeText={(value) => {updateHomePrice(value)}}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Down Payment $: 
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={downPaymentAmount.toString()}
          onChangeText={(value) => {updateHDownPaymentAmount(value)}}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Down Payment %:
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={downPaymentPercent.toString()}
          onChangeText={(value) => {updateDownPaymentPercent(value)}}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Loan Program: 
        </Text>
        <RNPickerSelect 
          style={styles.selector}
          value={loanTerm}
          onValueChange={(value) => updateLoanTerms(value)}
          items={loanOptions}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Interest Rate:
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={interestRate.toString()}
          onChangeText={(value) => {updateInterestRate(value)}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: aspectWidth,
    marginLeft: 8,
  },
  mortgageAContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8
  },
  mortgageAText: {
    fontSize: 20,
    fontWeight: '600'
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500'
  },
  input: {
    width: '25%',
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  selector: {
    fontSize: 18
  }
})

export default MortgageComponent