import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { Text, View } from 'react-native'

const ListingDetailsComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>Listing Info:</Text>
      </View>
      <View>
        <Text>{property.attributionInfo.attributionTitle}</Text>
        <Text>{property.attributionInfo.brokerName} - {property.attributionInfo.brokerPhoneNumber}</Text>
      </View>
      <View>
        <Text>Property Listing Agent:</Text>
        <Text>{property.attributionInfo.agentName} | {property.attributionInfo.agentLicenseNumber}</Text>
        <Text>{property.attributionInfo.agentEmail} </Text>
      </View>
      <View>
        <Text>Listed:</Text>
        <Text>MLS: {property.attributionInfo.mlsName} | {property.attributionInfo.mlsId}</Text>
      </View>
    </View>
  )
}

export default ListingDetailsComponent