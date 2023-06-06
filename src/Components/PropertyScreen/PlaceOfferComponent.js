import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const PlaceOfferComponent = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.button}>Make An Offer</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#4132E1',
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
  }
})

export default PlaceOfferComponent