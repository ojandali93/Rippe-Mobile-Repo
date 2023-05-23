import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'

import { PropertyContext } from '../Context/PropertyContext'
import { FinancesContext } from '../Context/FinancesContext'

import MainImage from '../Components/PropertyScreen/MainImage'
import ImageCarousel from '../Components/PropertyScreen/ImageCarousel'
import MortgageComponent from '../Components/PropertyScreen/ExpensesConponents/MortgageComponent'
import RevenueComponent from '../Components/PropertyScreen/RevenueComponent'
import StaticComponents from '../Components/PropertyScreen/ExpensesConponents/StaticComponents'
import UtilitiesComponent from '../Components/PropertyScreen/ExpensesConponents/UtilitiesComponent'
import AdditionalExpensesComponent from '../Components/PropertyScreen/ExpensesConponents/AdditionalExpensesComponent'
import InvestmentMetricCompnent from '../Components/PropertyScreen/InvestmentMetricComponent'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PropertyScreen = ({route}) => {

  const {loading, setPropertyDetails} = useContext(PropertyContext)
  const {expenses, totalRevenue} = useContext(FinancesContext)

  useEffect(() => {
    setPropertyDetails(route.params.zpid)
  }, [])

  const displayProperty = () => {
    return(
      <View style={styles.screen}>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <ScrollView>
          <MainImage />
          <ImageCarousel />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Total Revenue: ${totalRevenue}</Text>
          </View>
          <RevenueComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Total Expenses: ${expenses}</Text>
          </View>
          <MortgageComponent />
          <StaticComponents />
          <UtilitiesComponent />
          <AdditionalExpensesComponent />
        </ScrollView>
      </View>
    )
  }

  const displayLoading = () => {
    return(
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading Property</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
      </View>
    )
  }

  return (
    <View>
      {
        loading === true ? displayLoading() : displayProperty()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58
  },
  investmentCOntainer: {
    zIndex: 1,
    opacity: 1
  },
  loadingScreen: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  loading: {
    marginLeft: 16
  },
  expenseContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  expensesText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})

export default PropertyScreen