import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const ListingDetailsComponent = () => {

  const {property} = useContext(PropertyContext)

  const displayPhone = () => {
    return(
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

  const displayTablet = () => {
    return(
      <View style={styles.listingContainerTablet}>
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

  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
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
  listingContainerTablet: {
    width: aspectWidthTablet,
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