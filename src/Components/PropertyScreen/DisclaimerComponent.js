import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const DisclaimerComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>
          {property.attributionInfo.mlsDisclaimer}
        </Text>
      </View>
    </View>
  )
}

export default DisclaimerComponent