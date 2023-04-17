import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const MortgageComponent = () => {

  const {mortgage} = useContext(PropertyContext)
  const {homePrice, setHomePrice} = useContext(PropertyContext)
  const {downPaymentAmount, setDownPaymentAmount} = useContext(PropertyContext)
  const {downPaymentPercent, setDownPaymentPercent} = useContext(PropertyContext)
  const {loanAmount, setLoanAmount} = useContext(PropertyContext)
  const {interestRate, setInterestRate} = useContext(PropertyContext)
  const {loanTerm, setLoanTerm} = useContext(PropertyContext)

  const updateHomePrice = (value) => {
    setHomePrice(value)
  }

  const updateHDownPaymentAmount = (value) => {
    setDownPaymentAmount(value)
  }

  const updateDownPaymentPercent = (value) => {
    setDownPaymentPercent(value)
  }

  const updateLoanAmount = (value) => {
    setLoanAmount(value)
  }

  const updateInterestRate = (value) => {
    setInterestRate(value)
  }
  
  const updateLoanTerm = (value) => {
    setLoanTerm(value)
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
          Loan Program: {loanTerm}
        </Text>
        <TextInput
          inputMode='decimal'
          value={loanTerm.toString()}
          onChangeText={(value) => {updateLoanTerm(value)}}
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