import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

import MortgageComponent from '../ExpensesComponent/MortgageComponent'
import PropertyTaxComponent from '../ExpensesComponent/PropertyTaxComponent'
import MortgageInsuranceComponent from '../ExpensesComponent/MortgageInsuranceComponent'
import HoaComponent from '../ExpensesComponent/HoaComponent'
import UtilitiesComponent from '../ExpensesComponent/UtilitiesComponent'
import AdditionalExpensesComponent from '../ExpensesComponent/AdditionalExpensesComponent'

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
      <HoaComponent />
      <UtilitiesComponent />
      <AdditionalExpensesComponent />
    </View>
  )
}

export default ExpensesComponent