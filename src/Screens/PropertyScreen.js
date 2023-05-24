import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Feather } from 'react-native-vector-icons'

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
import QuickSummaryComponent from '../Components/PropertyScreen/QuickSummaryComponent'
import DetailsComponent from '../Components/PropertyScreen/DetailsComponent'
import DescriptionComponent from '../Components/PropertyScreen/DescriptionComponent'
import ListingDetailsComponent from '../Components/PropertyScreen/ListingDetailsComponent'
import ConnectWithAgentComponent from '../Components/PropertyScreen/ConnectWithAgentComponent'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PropertyScreen = ({route}) => {

  const [loadRevenue, setLoadRevenue] = useState(true)
  const [loadExpenses, setLoadExpenses] = useState(true)
  const [loadDetails, setLoadDetails] = useState(false)
  const [loadDescription, setLoadDecription] = useState(false)

  const {loading, setPropertyDetails} = useContext(PropertyContext)
  const {expenses, totalRevenue} = useContext(FinancesContext)

  useEffect(() => {
    setPropertyDetails(route.params.zpid)
  }, [])

  const displayExpensesComponents = () => {
    return(
      <>
        <MortgageComponent />
        <StaticComponents />
        <UtilitiesComponent />
        <AdditionalExpensesComponent />
      </>
    )
  }

  const displayProperty = () => {
    return(
      <View style={styles.screen}>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <ScrollView style={styles.scroll}>
          <MainImage />
          <ImageCarousel />
          <QuickSummaryComponent/>
          <TouchableOpacity onPress={() => {setLoadRevenue(!loadRevenue)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Revenue: ${totalRevenue}</Text>
                <Feather size={22} name={'chevrons-down'} />
            </View>
          </TouchableOpacity>
          {
            loadRevenue ? <RevenueComponent /> : null
          }
          <TouchableOpacity onPress={() => {setLoadExpenses(!loadExpenses)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Expenses: ${expenses}</Text>
                <Feather size={22} name={'chevrons-down'} />
            </View>
          </TouchableOpacity>
          {
            loadExpenses ? displayExpensesComponents() : null
          }
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Property Details</Text>
          </View>
          <DetailsComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Property Description:</Text>
          </View>
          <DescriptionComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Listing Details:</Text>
          </View>
          <ListingDetailsComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Connect With An Agent</Text>
          </View>
          <ConnectWithAgentComponent />
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
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    paddingHorizontal: 8
  },
  expensesText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  scroll: {
    height: 600
  }
})

export default PropertyScreen