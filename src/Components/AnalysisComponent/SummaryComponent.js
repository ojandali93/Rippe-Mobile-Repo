import React, { useContext } from 'react'
import { AnalysisContext } from '../../Context/AnalysisContext'
import { Text, View } from 'react-native'

const SummaryComponent = () => {

  const {citySummary} = useContext(AnalysisContext)

  return (
    <View>
      <View>
        <Text>SUMMARY</Text>
      </View>
      <View>
        <View>
          <Text>Active Neighborhoods: {citySummary.active_neighborhoods}</Text>
        </View>
        <View>
          <Text>Investment Properties: {citySummary.investment_properties}</Text>
        </View>
        <View>
          <Text>Airbnb Listings: {citySummary.airbnb_listings}</Text>
        </View>
        <View>
          <Text>Tranditional Listings: {citySummary.traditional_listings}</Text>
        </View>
        <View>
          <Text>Average Airbnb Rental: {citySummary.avg_airbnb_rental}</Text>
        </View>
        <View>
        <Text>Average Tranditional Rental: {citySummary.avg_traditional_rental}</Text>
        </View>
        <View>
          <Text>Average Occupancy: {citySummary.avg_occupancy}</Text>
        </View>
        <View>
          <Text>Average Nightly Price: {citySummary.avg_nightly_price}</Text>
        </View>
      </View>
    </View>
  )
}

export default SummaryComponent