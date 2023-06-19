import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

import { convertNumberToFormattedNumber, convertString, convertToDollarAmount } from '../../../utilities'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const QuickSummaryComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View style={styles.summaryContainer}>
      <View>
        <View style={styles.main}>
          <Text style={styles.price}>
            ${convertToDollarAmount(property.price)}
          </Text>
          <Text style={styles.status}>
            {convertString(property.homeStatus)}
          </Text>
        </View>
        <View>
          <Text style={[styles.summary]}>
            {property.bedrooms} Beds | {property.bathrooms} Baths | {convertNumberToFormattedNumber(property.livingArea)} Sqft 
          </Text>
        </View>
        <View>
          <Text style={styles.summary}>
            {property.address.streetAddress}
          </Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.summary}>
            {property.address.city}, {property.address.state} {property.address.zipcode} 
          </Text>
          <Text style={styles.status}>
            {convertString(property.homeType)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  summaryContainer: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  status: {
    fontSize: 18,
    fontWeight: '600'
  },
  summary: {
    fontSize: 18
  }
})

export default QuickSummaryComponent