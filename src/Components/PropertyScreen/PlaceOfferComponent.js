import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const PlaceOfferComponent = () => {
  const navigation = useNavigation()

  const displayPhone = () => {
    return(
      <View>
        <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('OfferScreen')}}>
          <Text style={styles.button}>Make An Offer</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const displayTablet = () => {
    return(
      <View>
        <TouchableOpacity style={styles.containerTablet} onPress={() => {navigation.navigate('OfferScreen')}}>
          <Text style={styles.button}>Make An Offer</Text>
        </TouchableOpacity>
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