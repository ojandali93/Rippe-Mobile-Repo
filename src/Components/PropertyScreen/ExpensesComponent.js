import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

import MortgageComponent from '../ExpensesComponent/MortgageComponent'
import PropertyTaxComponent from '../ExpensesComponent/PropertyTaxComponent'
import MortgageInsuranceComponent from '../ExpensesComponent/MortgageInsuranceComponent'

const ExpensesComponent = () => {

  const {mortgage, setMortgage} = useContext(PropertyContext)

  return (
    <View>
      <Text>
        Expenses
      </Text>
      <MortgageComponent />
      <PropertyTaxComponent />
      <MortgageInsuranceComponent />
    </View>
  )
}

export default ExpensesComponent