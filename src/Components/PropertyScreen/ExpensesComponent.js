import React, { useContext, useEffect } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

import MortgageComponent from '../ExpensesComponent/MortgageComponent'
import PropertyTaxComponent from '../ExpensesComponent/PropertyTaxComponent'
import MortgageInsuranceComponent from '../ExpensesComponent/MortgageInsuranceComponent'
import HoaComponent from '../ExpensesComponent/HoaComponent'
import UtilitiesComponent from '../ExpensesComponent/UtilitiesComponent'
import AdditionalExpensesComponent from '../ExpensesComponent/AdditionalExpensesComponent'

const ExpensesComponent = () => {

  const {totalExpenses, setTotalExpenses} = useContext(PropertyContext)
  const {homeInsurance} = useContext(PropertyContext)
  const {utilities} = useContext(PropertyContext)
  const {otherExpenses} = useContext(PropertyContext)
  const {hoa} = useContext(PropertyContext)
  const {propertyTax} = useContext(PropertyContext)
  const {mortgage} = useContext(PropertyContext)

  useEffect(() => {
    setTotalExpenses(parseInt(homeInsurance) + parseInt(utilities) + parseInt(mortgage) + 
      parseInt(otherExpenses) + parseInt(hoa) + parseInt(propertyTax))
  }, [homeInsurance, utilities, otherExpenses, hoa, propertyTax, mortgage])

  return (
    <View>
      <Text>
        Expenses: {totalExpenses}
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