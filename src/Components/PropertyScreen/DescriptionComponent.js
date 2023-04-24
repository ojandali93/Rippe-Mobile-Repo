import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { View, Text } from 'react-native'

const DescriptionComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>
          Property Description:
        </Text>
      </View>
      <View>
        <Text>
          {property.description}
        </Text>
      </View>
    </View>
  )
}

export default DescriptionComponent