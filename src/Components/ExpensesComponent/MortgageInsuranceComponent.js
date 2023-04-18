import React, { useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const MortgageInsuranceComponent = () => {

  const {homeInsurance} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>Home Insurance: {homeInsurance}</Text>
      </View>
    </View>
  )
}

export default MortgageInsuranceComponent