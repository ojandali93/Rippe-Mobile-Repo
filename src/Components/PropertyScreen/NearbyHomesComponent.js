import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 80
const aspectHeight = (aspectWidth / 1.78) + 1

const NearbyHomesComponent = () => {

  const {property} = useContext(PropertyContext)

  const formatStatus = (status) => {
    let currentStatus = status
    let formattedString = currentStatus.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formattedString
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {
          property.nearbyHomes.map((item) => {
            return(
              <View style={styles.property} key={item.zpid}>
                <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: item.miniCardPhotos[0].url}}/>
                <View style={styles.summary}>
                  <View style={styles.background}></View>
                  <View>
                    <Text style={[styles.text, styles.price, styles.summaryInfo]}>${property.price}</Text>
                  </View>
                  <View>
                    <Text style={styles.address}>
                      {property.streetAddress}
                    </Text>
                    <Text style={styles.address}>
                      {property.city}, {property.state} {property.zipcode}
                    </Text>
                  </View>
                  <View style={styles.bottomRowSummary}>
                    <Text style={styles.address}>
                      {property.bedrooms} Beds | {property.bathrooms} Bath | {property.livingArea} Sqft.
                    </Text>
                    <Text style={styles.address}>
                      {formatStatus(property.homeStatus)}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  property: {
    marginRight: 8
  },
  summary: {
    position: 'absolute',
    padding: 8
  },
  background: {
    position: 'absolute',
    height: aspectHeight,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeight - 120
  },
  text: {
    color: 'white'
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  address: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16
  },
  bottomRowSummary: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})


export default NearbyHomesComponent