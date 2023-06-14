import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 80
const aspectHeight = (aspectWidth / 1.78) + 1
const deviceWidthTablet = 425
const aspectWidthTablet = deviceWidthTablet - 16
const aspectWidthImageTablet = deviceWidthTablet - 80
const aspectHeightTablet = (aspectWidthTablet / 1.78) + 1

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

  const displayPhone = () => {
    return(
      <View style={styles.container}>
        <ScrollView horizontal>
          {
            property.nearbyHomes.map((item) => {
              return(
                <View style={styles.propertyTablet} key={item.zpid}>
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

  const displayTablet = () => {
    return(
      <View style={styles.containerTablet}>
        <ScrollView horizontal>
          {
            property.nearbyHomes.map((item) => {
              return(
                <View style={styles.propertyTablet} key={item.zpid}>
                  <Image style={{height: aspectHeightTablet, width: aspectWidthImageTablet}} source={{uri: item.miniCardPhotos[0].url}}/>
                  <View style={styles.summary}>
                    <View style={styles.backgroundTablet}></View>
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

  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  containerTablet: {
    width: aspectWidthTablet,
    margin: 8
  },
  property: {
    marginRight: 8
  },
  propertyTablet: {
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden'
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
  backgroundTablet: {
    position: 'absolute',
    height: aspectHeightTablet,
    width: aspectWidthImageTablet,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  favoriteMenuTablet: {
    width: aspectWidthImageTablet,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeightTablet - 112
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