import React, { useContext } from 'react'
import { View, Text, TextInput } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const PropertyTaxComponent = () => {

  const {propertyTax, propertyTaxRate, 
         setPropertyTaxRate} = useContext(PropertyContext)

  const updatePropertyTaxRate = (value) => {
    setPropertyTaxRate(value)
  }

  return (
    <View>
      <View>
        <Text>
          Property Tax: {propertyTax}
        </Text>
      </View>
      <View>
        <Text>
          Property Tax Rate: {propertyTaxRate}
        </Text>
        <TextInput 
          value={propertyTaxRate.toString()}
          onChangeText={(value) => {updatePropertyTaxRate(value)}}
        />
      </View>
    </View>
  )
}

export default PropertyTaxComponent