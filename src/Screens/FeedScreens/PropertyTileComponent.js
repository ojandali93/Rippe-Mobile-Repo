import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { Entypo, Feather } from 'react-native-vector-icons'
import { auth, db } from '../../Api/firebaseTesting'
import { doc, deleteDoc } from 'firebase/firestore'
import { FavoritesContext } from '../../Context/FavoritesContext'
import { properties } from '../../Api/zillowApi'
import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 210
const aspectHeightMain = (deviceWidth / 1.78) + 1

const tabletAspectWidth = 375
const tabletAspectHeight = (tabletAspectWidth / 1.78) + 1

const PropertyTileComponent = ({item}) => {
  const navigation = useNavigation()

  const [propertyList, setPropertyList] = useState([])
  const [loading, setLoading] = useState(true)

  const {favoritesZpids, favorites, addFeedFavorite, removeFromFavorites} = useContext(FavoritesContext)

  useEffect(() => {
    grabFeedContent()
  })

  const grabFeedContent = () => {
    properties.params = item.search
    axios.request(properties)
      .then((response) => {
        setPropertyList(response.data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const showLoadingTablet = () => {
    return(
      <View style={styles.tabletLoadingScreen}>
        <Text style={styles.tabletLoadingText}>Loading properties</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
      </View>
    )
  }

  const showProperties = () => {
    return(
      <ScrollView horizontal style={styles.scrollViewTablet}>
        {
          propertyList.map((property) => {
            return(
              <View key={property.zpid}>
                <TouchableOpacity style={styles.propertyTablet} onPress={() => {navigation.navigate('PropertyFeedScreen', {zpid: property.zpid})}}> 
                  <View>
                    <Image style={{height: tabletAspectHeight, width: tabletAspectWidth}} source={{uri: property.imgSrc}}/>
                    <View style={styles.summary}>
                      <View style={styles.background}></View>
                      <View style={styles.favoriteMenu}>
                        {
                          favoritesZpids.includes(property.zpid)
                          ? <TouchableOpacity stlye={styles.menu} onPress={() => {removeFromFavorites(property)}}><Entypo color={'white'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
                          : <TouchableOpacity stlye={styles.menu} onPress={() => {addFeedFavorite(property)}}><Entypo color={'white'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
                        }
                      </View>
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
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  return (
    <>
      {
        loading ? showLoadingTablet() : showProperties()
      }
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewTablet: {
    height: tabletAspectHeight + 8,
  },
  propertyTablet: {
    width: tabletAspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    marginRight: 8,
    backgroundColor: '#E8E8E8'
  },
  summary: {
    position: 'absolute',
    padding: 8
  },
  background: {
    position: 'absolute',
    height: aspectHeightMain,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: tabletAspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: tabletAspectHeight - 140
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
  tabletLoadingScreen: {
    width: aspectWidth,
    marginLeft: 8,
    height: tabletAspectHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabletLoadingText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})

export default PropertyTileComponent