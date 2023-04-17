import React, { useContext } from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const RevenueComponent = () => {

  const {revenue, setRevenue} = useContext(PropertyContext)
  const {additionalRevenue, setAdditionalRevenue} = useContext(PropertyContext)

  const updateRevenue = (value) => {
    setRevenue(value)
  }

  const updateAdditionalRevenue = (value) => {
    setAdditionalRevenue(value)
  }

  return (
    <View>
      <View>
        <Text>
          Monthly Revenue:
        </Text>
      </View>
      <View>
        <Text>
          Rent: {revenue}
        </Text>
        <TextInput
          inputMode='decimal'
          value={revenue}
          onChangeText={(value) => {updateRevenue(value)}}
        />
      </View>
      <View>
        <Text>
          Additional Revenue: {additionalRevenue}
        </Text>
        <TextInput
          inputMode='decimal'
          value={additionalRevenue}
          onChangeText={(value) => {updateAdditionalRevenue(value)}}
        />
      </View>
    </View>
  )
}

export default RevenueComponent