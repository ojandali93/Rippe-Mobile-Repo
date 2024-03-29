import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Feather } from 'react-native-vector-icons'

import { PropertyContext } from '../Context/PropertyContext'
import { FinancesContext } from '../Context/FinancesContext'
import { FavoritesContext } from '../Context/FavoritesContext'

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
import SaleHistoryComponent from '../Components/PropertyScreen/SaleHistoryComponent'
import TaxHistoryComponent from '../Components/PropertyScreen/TaxHistoryComponent'
import MapComponent from '../Components/PropertyScreen/MapComponent'
import OpenHouseComponent from '../Components/PropertyScreen/OpenHouseComponent'
import SchoolsComponent from '../Components/PropertyScreen/SchoolsComponent'
import NearbyHomesComponent from '../Components/PropertyScreen/NearbyHomesComponent'
import DisclaimerComponent from '../Components/PropertyScreen/DisclaimerComponent'
import PlaceOfferComponent from '../Components/PropertyScreen/PlaceOfferComponent'
import ImageCarouseTabletComponent from '../Components/PropertyScreen/ImageCarouseTabletComponent'
import { convertNumberToFormattedNumber, convertToDollarAmount } from '../../utilities'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const scrollHeight = deviceHeight - 315

const PropertyScreen = ({route}) => {

  const [loadRevenue, setLoadRevenue] = useState(true)
  const [loadExpenses, setLoadExpenses] = useState(true)
  const [loadDetails, setLoadDetails] = useState(false)
  const [loadDescription, setLoadDecription] = useState(false)

  const {loading, setLoading, setPropertyDetails, errorMessage} = useContext(PropertyContext)
  const {expenses, totalRevenue} = useContext(FinancesContext)
  const {accessInvestmentMetrics, setAccessInvestmentMetrics} = useContext(PropertyContext)

  useEffect(() => {
    setLoading(true)
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

  const displayPropertyWithMetrics = () => {
    return(
      <View style={
        deviceHeight > 900 
          ? styles.screen 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.screenM 
            : deviceHeight < 800
              ? styles.screenS
              : null
      }>
        <View style={styles.statusBar}></View>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <ScrollView style={
          deviceHeight > 900 
          ? styles.scrollMetricPhone 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.scrollM 
            : deviceHeight < 800
              ? styles.scrollS
              : null
        }>
          <MainImage />
          <ImageCarousel />
          <QuickSummaryComponent/>
          <TouchableOpacity onPress={() => {setLoadRevenue(!loadRevenue)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Revenue: ${convertNumberToFormattedNumber(totalRevenue)}</Text>
                <Feather size={22} name={'chevrons-down'} />
            </View>
          </TouchableOpacity>
          {
            loadRevenue ? <RevenueComponent /> : null
          }
          <View style={styles.splitLine}></View>
          <TouchableOpacity onPress={() => {setLoadExpenses(!loadExpenses)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Expenses: ${convertNumberToFormattedNumber(expenses)}</Text>
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
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Sale History</Text>
          </View>
          <SaleHistoryComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Tax History</Text>
          </View>
          <TaxHistoryComponent />
          <PlaceOfferComponent />
          <MapComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Open House</Text>
          </View>
          <OpenHouseComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Nearby Schools</Text>
          </View>
          <SchoolsComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Nearby Homes</Text>
          </View>
          <NearbyHomesComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>MLS Info</Text>
          </View>
          <DisclaimerComponent />
        </ScrollView>
      </View>
    )
  }

  const displayPropertyWithoutMetrics = () => {
    return(
      <View style={
          deviceHeight > 900 
            ? styles.screen 
            : deviceHeight > 800 && deviceHeight < 900 
              ? styles.screenM 
              : deviceHeight < 800
                ? styles.screenS
                : null
        }>
        <View style={styles.statusBar}></View>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <ScrollView style={
            deviceHeight > 900 
            ? styles.scrollNoMetricsPhone 
            : deviceHeight > 800 && deviceHeight < 900 
              ? styles.scrollNoMetricsPhoneM 
              : deviceHeight < 800
                ? styles.scrollNoMetricsPhoneS
                : null
          }>
          <MainImage />
          <ImageCarousel />
          <QuickSummaryComponent/>
          <TouchableOpacity onPress={() => {setLoadRevenue(!loadRevenue)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Revenue: ${convertNumberToFormattedNumber(totalRevenue)}</Text>
                <Feather size={22} name={'chevrons-down'} />
            </View>
          </TouchableOpacity>
          {
            loadRevenue ? <RevenueComponent /> : null
          }
          <TouchableOpacity onPress={() => {setLoadExpenses(!loadExpenses)}}>
            <View style={styles.expenseContainer}>
              <Text style={styles.expensesText}>Total Expenses: ${convertNumberToFormattedNumber(expenses)}</Text>
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
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Sale History</Text>
          </View>
          <SaleHistoryComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Tax History</Text>
          </View>
          <TaxHistoryComponent />
          <PlaceOfferComponent />
          <MapComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Open House</Text>
          </View>
          <OpenHouseComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Nearby Schools</Text>
          </View>
          <SchoolsComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>Nearby Homes</Text>
          </View>
          <NearbyHomesComponent />
          <View style={styles.expenseContainer}>
            <Text style={styles.expensesText}>MLS Info</Text>
          </View>
          <DisclaimerComponent />
        </ScrollView>
      </View>
    )
  }

  const displayProperty = () => {
    return(
      <>
        {
          accessInvestmentMetrics ? displayPropertyWithMetrics()  : displayPropertyWithoutMetrics()
        }
      </>
    )
  }

  const displayPropertyTabletWithMetrics = () => {
    return(
      <View style={styles.screenTablet}>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <View style={styles.splitTablet}>
          <View style={styles.splitImages}>
            <ImageCarouseTabletComponent/>
          </View>
          <View style={styles.splitContent}>
            <ScrollView style={[styles.scrollTablet]}>
              <QuickSummaryComponent/>
              <TouchableOpacity onPress={() => {setLoadRevenue(!loadRevenue)}}>
                <View style={styles.expenseContainer}>
                  <Text style={styles.expensesText}>Total Revenue: ${convertToDollarAmount(totalRevenue)}</Text>
                    <Feather size={22} name={'chevrons-down'} />
                </View>
              </TouchableOpacity>
              {
                loadRevenue ? <RevenueComponent /> : null
              }
              <TouchableOpacity onPress={() => {setLoadExpenses(!loadExpenses)}}>
                <View style={styles.expenseContainer}>
                  <Text style={styles.expensesText}>Total Expenses: ${convertToDollarAmount(expenses)}</Text>
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
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Sale History</Text>
              </View>
              <SaleHistoryComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Tax History</Text>
              </View>
              <TaxHistoryComponent />
              <PlaceOfferComponent />
              <MapComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Open House</Text>
              </View>
              <OpenHouseComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Nearby Schools</Text>
              </View>
              <SchoolsComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Nearby Homes</Text>
              </View>
              <NearbyHomesComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>MLS Info</Text>
              </View>
              <DisclaimerComponent />
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

  const displayPropertyTabletWithoutMetrics = () => {
    return(
      <View style={styles.screenTablet}>
        <View style={styles.investmentCOntainer}>
          <InvestmentMetricCompnent />
        </View>
        <View style={styles.splitTabletFull}>
          <View style={styles.splitImages}>
            <ImageCarouseTabletComponent/>
          </View>
          <View style={styles.splitContent}>
            <ScrollView style={[styles.scrollTablet]}>
              <QuickSummaryComponent/>
              <TouchableOpacity onPress={() => {setLoadRevenue(!loadRevenue)}}>
                <View style={styles.expenseContainer}>
                  <Text style={styles.expensesText}>Total Revenue: ${convertToDollarAmount(totalRevenue)}</Text>
                    <Feather size={22} name={'chevrons-down'} />
                </View>
              </TouchableOpacity>
              {
                loadRevenue ? <RevenueComponent /> : null
              }
              <TouchableOpacity onPress={() => {setLoadExpenses(!loadExpenses)}}>
                <View style={styles.expenseContainer}>
                  <Text style={styles.expensesText}>Total Expenses: ${convertToDollarAmount(expenses)}</Text>
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
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Sale History</Text>
              </View>
              <SaleHistoryComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Tax History</Text>
              </View>
              <TaxHistoryComponent />
              <PlaceOfferComponent />
              <MapComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Open House</Text>
              </View>
              <OpenHouseComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Nearby Schools</Text>
              </View>
              <SchoolsComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>Nearby Homes</Text>
              </View>
              <NearbyHomesComponent />
              <View style={styles.expenseContainer}>
                <Text style={styles.expensesText}>MLS Info</Text>
              </View>
              <DisclaimerComponent />
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }

  const displayPropertyTablet = () => {
    return(
      <>
        {
          accessInvestmentMetrics ? displayPropertyTabletWithMetrics() : displayPropertyTabletWithoutMetrics()
        }
      </>
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

  const displayError = () => {
    return(
      <View style={styles.loadingScreen}>
        <Text style={styles.errorText}>Loading Property</Text>
      </View>
    )
  }

  return (
    <View>
      {
        errorMessage
          ? displayError()
          : loading === true 
            ? displayLoading() 
            : deviceWidth >= 500
              ? displayPropertyTablet()
              : displayProperty()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58
  },
  screenM: {
    marginTop: 40
  },
  screenS: {
    marginTop: 22
  },
  statusBar: {
    width: deviceWidth,
    height: 58,
    backgroundColor: 'whhite',
    position: 'absolute',
    top: 0,
    left: 0
  },
  screenNoInvestment: {
    height: deviceHeight - 118
  },
  screenTablet: {
    marginTop: 16
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
  errorText: {
    fontSize: 18,
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
    height: deviceHeight - 354
  },
  scrollM: {
    height: deviceHeight - 332
  },
  scrollS: {
    height: deviceHeight - 288
  },
  scrollNoMetricsPhone: {
    height: deviceHeight - 170
  },
  scrollNoMetricsPhoneM: {
    height: deviceHeight - 150
  },
  scrollNoMetricsPhoneS: {
    height: deviceHeight - 108
  },
  scrollMetricPhone: {
    height: deviceHeight - 308
  },
  scrollNoMetrics: {
    height: deviceHeight - 120
  },
  scrollNoMetricsM: {
    height: deviceHeight - 150
  },
  scrollNoMetricsS: {
    height: deviceHeight - 108
  },
  splitTablet: {
    width: deviceWidth,
    height: deviceHeight - 300,
    display: 'flex',
    flexDirection: 'row',
  },
  splitTabletFull: {
    width: deviceWidth,
    height: deviceHeight - 104,
    display: 'flex',
    flexDirection: 'row',
  },
  splitImages: {
    width: deviceWidth - 425
  },
  splitContent: {
    width: 425
  },
  splitLine: {
    width: deviceWidth,
    height: 1,
    backgroundColor: 'lightgrey'
  }
})

export default PropertyScreen