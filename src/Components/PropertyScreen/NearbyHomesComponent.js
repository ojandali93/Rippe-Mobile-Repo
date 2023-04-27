import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const NearbyHomesComponent = () => {

  const {nearbyHomes} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>Nearby Homes</Text>
      </View>
      {
        nearbyHomes.map((item) => {
          return(
            <View key={item.zpid}>
              <View>
                <Text>Address: {item.address.streetAddress} 
                        {item.address.city} {item.address.state}  {item.address.zipcode}</Text>
              </View>
              <View>
                <Text>Price: {item.price}</Text>
              </View>
              <View>
                <Text>Status: {item.homeStatus}</Text>
              </View>
              <View>
                <Text>Type: {item.homeType}</Text>
              </View>
              <View>
                <Text>Details: {item.bedrooms} Beds | {item.bathrooms} Bath | {item.livingAreaValue} Sqft.</Text>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}

export default NearbyHomesComponent