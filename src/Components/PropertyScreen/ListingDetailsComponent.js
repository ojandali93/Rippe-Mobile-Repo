import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const ListingDetailsComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View style={styles.listingContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>{property.attributionInfo.attributionTitle}</Text>
        <Text style={styles.text}>{property.attributionInfo.brokerName} - {property.attributionInfo.brokerPhoneNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Property Listing Agent:</Text>
        <Text style={styles.text}>{property.attributionInfo.agentName} | {property.attributionInfo.agentLicenseNumber}</Text>
        <Text style={styles.text}>{property.attributionInfo.agentEmail} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Listed:</Text>
        <Text style={styles.text}>MLS: {property.attributionInfo.mlsName} | {property.attributionInfo.mlsId}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listingContainer: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  text: {
    fontSize: 18
  },
  row: {
    paddingVertical: 4
  }
})

export default ListingDetailsComponent