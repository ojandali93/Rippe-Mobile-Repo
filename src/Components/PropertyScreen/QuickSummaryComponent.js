import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const QuickSummaryComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <View>
          <Text>
            quick summary
          </Text>
        </View>
        <View>
          <Text>
            ${property.price}
          </Text>
          <Text>
            {property.homeStatus}
          </Text>
        </View>
        <View>
          <Text>
            {property.bedrooms} Beds
          </Text>
          <Text>
            {property.bathrooms} Baths
          </Text>
          <Text>
            {property.livingArea} Sqft
          </Text>
          <Text>
            {property.lotSize} Sqft
          </Text>
        </View>
        <View>
          <Text>
            {property.homeType}
          </Text>
          <Text>
            built: {property.yearBuilt}
          </Text>
          <Text>
            Zestimate: {property.zestimate}
          </Text>
          {
            property.monthlyHoaFee === null 
              ? <Text>Hoa Fee: $0</Text>
              : <Text>Hoa Fee: {property.monthlyHoaFee} </Text>
          }
        </View>
      </View>
    </View>
  )
}

export default QuickSummaryComponent