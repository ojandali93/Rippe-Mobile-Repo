import React, { useContext } from 'react'
import { AnalysisContext } from '../../Context/AnalysisContext'
import { Text, View } from 'react-native'

const RentalRatesAirbnbComponent = () => {

  const {airbnbRentalRates } = useContext(AnalysisContext)

  return (
    <View>
      <View>
        <Text>RENTAL RATES {'(Airbnb)'}</Text>
      </View>
      <View>
        <View>
          <Text>Studio: {airbnbRentalRates.studio_value}</Text>
        </View>
        <View>
          <Text>1 Bedroom: {airbnbRentalRates.one_room_value}</Text>
        </View>
        <View>
          <Text>2 Bedroom: {airbnbRentalRates.two_room_value}</Text>
        </View>
        <View>
          <Text>3 Bedroom: {airbnbRentalRates.three_room_value}</Text>
        </View>
        <View>
          <Text>4 Bedroom: {airbnbRentalRates.four_room_value}</Text>
        </View>
      </View>
    </View>
  )
}

export default RentalRatesAirbnbComponent