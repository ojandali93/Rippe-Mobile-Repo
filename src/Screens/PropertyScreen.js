import React, { useContext, useEffect } from 'react'
import { PropertyContext } from '../Context/PropertyContext'
import { Text, View, ScrollView } from 'react-native'

import MainImage from '../Components/PropertyScreen/MainImage'
import ImageCarousel from '../Components/PropertyScreen/ImageCarousel'
import QuickSummaryComponent from '../Components/PropertyScreen/QuickSummaryComponent'
import RevenueComponent from '../Components/PropertyScreen/RevenueComponent'
import ExpensesComponent from '../Components/PropertyScreen/ExpensesComponent'
import InvestmentMetricCompnent from '../Components/PropertyScreen/InvestmentMetricCompnent'
import DetailsComponent from '../Components/PropertyScreen/DetailsComponent'
import DescriptionComponent from '../Components/PropertyScreen/DescriptionComponent'
import ListingDetailsComponent from '../Components/PropertyScreen/ListingDetailsComponent'
import OpenHouseComponent from '../Components/PropertyScreen/OpenHouseComponent'
import ScheduleTourComponent from '../Components/PropertyScreen/ScheduleTourComponent'
import SaleHistoryComponent from '../Components/PropertyScreen/SaleHistoryComponent'
import TaxHistoryComponent from '../Components/PropertyScreen/TaxHistoryComponent'
import ConnectWithAgentComponent from '../Components/PropertyScreen/ConnectWithAgentComponent'
import SchoolsComponent from '../Components/PropertyScreen/SchoolsComponent'
import NearbyHomesComponent from '../Components/PropertyScreen/NearbyHomesComponent'
import DisclaimerComponent from '../Components/PropertyScreen/DisclaimerComponent'

const PropertyScreen = () => {

  const {setPropertyDetails, loading} = useContext(PropertyContext)

  useEffect(() => {
    setPropertyDetails()
  }, [])

  const displayProperty = () => {
    return(
      <View>
        <ScrollView>
          <Text>Loaded Property</Text>
          <MainImage />
          <ImageCarousel />
          <QuickSummaryComponent />
          <RevenueComponent />
          <ExpensesComponent />
          <InvestmentMetricCompnent />
          <DetailsComponent />
          <DescriptionComponent />
          <ListingDetailsComponent />
          <OpenHouseComponent />
          <ScheduleTourComponent />
          <SaleHistoryComponent />
          <TaxHistoryComponent />
          <ConnectWithAgentComponent />
          <SchoolsComponent />
          <NearbyHomesComponent />
          <DisclaimerComponent />
        </ScrollView>
      </View>
    )
  }

  return (
    <View>
      {
        loading === true ? <Text>Loading</Text> : displayProperty()
      }
    </View>
  )
}

export default PropertyScreen