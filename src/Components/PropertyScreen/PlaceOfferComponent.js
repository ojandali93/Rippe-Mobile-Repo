import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const displayPhone = () => {
  return(
    <View>
      <View style={styles.container}>
        <Text style={styles.button}>Make An Offer</Text>
      </View>
    </View>
  )
}

const displayTablet = () => {
  return(
    <View>
      <View style={styles.containerTablet}>
        <Text style={styles.button}>Make An Offer</Text>
      </View>
    </View>
  )
}

const PlaceOfferComponent = () => {
  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#0039a6',
    marginVertical: 8,
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18
  },
  container: {
    width: aspectWidth,
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerTablet: {
    width: aspectWidthTablet,
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default PlaceOfferComponent