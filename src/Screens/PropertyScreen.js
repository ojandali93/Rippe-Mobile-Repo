import React, { useContext, useEffect } from 'react'
import { PropertyContext } from '../Context/PropertyContext'
import { Text, View, ScrollView } from 'react-native'

import MainImage from '../Components/PropertyScreen/MainImage'
import ImageCarousel from '../Components/PropertyScreen/ImageCarousel'
import QuickSummaryComponent from '../Components/PropertyScreen/QuickSummaryComponent'
import RevenueComponent from '../Components/PropertyScreen/RevenueComponent'
import ExpensesComponent from '../Components/PropertyScreen/ExpensesComponent'
import InvestmentMetricCompnent from '../Components/PropertyScreen/InvestmentMetricCompnent'

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