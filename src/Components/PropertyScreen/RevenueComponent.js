import React, { useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const RevenueComponent = () => {

  const {revenue, setRevenue, setTotalRevenue} = useContext(PropertyContext)
  const {additionalRevenue, setAdditionalRevenue} = useContext(PropertyContext)

  const updateRevenue = (value) => {
    setRevenue(value)
  }

  const updateAdditionalRevenue = (value) => {
    setAdditionalRevenue(value)
  }

  useEffect(() => {
    setTotalRevenue(parseInt(revenue) + parseInt(additionalRevenue))
  }, [revenue, additionalRevenue])

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
          value={revenue.toString()}
          onChangeText={(value) => {updateRevenue(value)}}
        />
      </View>
      <View>
        <Text>
          Additional Revenue: {additionalRevenue}
        </Text>
        <TextInput
          inputMode='decimal'
          value={additionalRevenue.toString()}
          onChangeText={(value) => {updateAdditionalRevenue(value)}}
        />
      </View>
    </View>
  )
}

export default RevenueComponent