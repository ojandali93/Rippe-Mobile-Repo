import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { Text, View } from 'react-native'

const DetailsComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>Property Details</Text>
      </View>
      <View>
        <Text>Property Type: {property.homeType}</Text>
      </View>
      <View>
        <Text>Year Built: {property.yearBuilt}</Text>
      </View>
      <View>
        <Text>Has AC: {property.resoFacts.hasCooling === true ? <Text> Yes </Text> : <Text> No </Text>}</Text>
      </View>
      <View>
        <Text>Has Heating: {property.resoFacts.hasHeating === true ? <Text> Yes </Text> : <Text> No </Text>}</Text>
      </View>
      <View>
        <Text>Total Parking Spaces: {property.resoFacts.parking}</Text>
      </View>
      <View>
        <Text>Stories: {property.resoFacts.stories}</Text>
      </View>
      <View>
        <Text>SQFT: {property.resoFacts.livingArea}</Text>
      </View>
      <View>
        <Text>Lot Size: {property.resoFacts.lotSize}</Text>
      </View>
      <View>
        <Text>Price/Sqft: ${property.resoFacts.pricePerSquareFoot}</Text>
      </View>
      <View>
        <Text>{property.resoFacts.associationName === null ? null : <Text>Association Name: {property.resoFacts.associationName}</Text>}</Text>
      </View>
      <View>
        <Text>{property.resoFacts.associationFee === null ? null : <Text>Association Fee: {property.resoFacts.associationFee}</Text>}</Text>
      </View>
      <View>
        <Text>Rooms</Text>
      </View>
      <View>
        <Text>Appliances</Text>
      </View>
      <View>
        <Text>Has Washer & Dryer</Text>
      </View>
      <View>
        <Text>Parcel Number: {property.resoFacts.parcelNumber}</Text>
      </View>
    </View>
  )
}

export default DetailsComponent