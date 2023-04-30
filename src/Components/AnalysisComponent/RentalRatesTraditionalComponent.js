import React, { useContext } from 'react'
import { AnalysisContext } from '../../Context/AnalysisContext'
import { Text, View } from 'react-native'

const RentalRatesTraditionalComponent = () => {

  const {traditionalRentalRates } = useContext(AnalysisContext)

  return (
    <View>
      <View>
        <Text>RENTAL RATES {'(Traditional)'}</Text>
      </View>
      <View>
        <View>
          <Text>Studio: {traditionalRentalRates.studio_value}</Text>
        </View>
        <View>
          <Text>1 Bedroom: {traditionalRentalRates.one_room_value}</Text>
        </View>
        <View>
          <Text>2 Bedroom: {traditionalRentalRates.two_room_value}</Text>
        </View>
        <View>
          <Text>3 Bedroom: {traditionalRentalRates.three_room_value}</Text>
        </View>
        <View>
          <Text>4 Bedroom: {traditionalRentalRates.four_room_value}</Text>
        </View>
      </View>
    </View>
  )
}

export default RentalRatesTraditionalComponent