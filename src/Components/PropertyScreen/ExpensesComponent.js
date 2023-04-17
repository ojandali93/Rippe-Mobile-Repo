import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

import MortgageComponent from '../ExpensesComponent/MortgageComponent'

const ExpensesComponent = () => {

  const {mortgage, setMortgage} = useContext(PropertyContext)

  return (
    <View>
      <Text>
        Expenses
      </Text>
      <MortgageComponent />
    </View>
  )
}

export default ExpensesComponent