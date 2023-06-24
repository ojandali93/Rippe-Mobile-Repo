import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet} from 'react-native'
import { auth, db } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'
import { doc, deleteDoc } from 'firebase/firestore';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { FavoritesContext } from '../Context/FavoritesContext'
import { Entypo } from 'react-native-vector-icons'

import MainMapsConponents from '../Components/PropertiesScreen/MainMapsConponents'
import StaticMapsComponent from '../Components/PropertiesScreen/StaticMapsComponent'
import { convertNumberToFormattedNumber, convertToDollarAmount } from '../../utilities'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = deviceHeight - 100
const aspectHeightMain = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 202

const tabletWidth = 375
const tabletImageHeight = (tabletWidth / 1.78) + 1

const tabletSplitWidth = Dimensions.get('window').width - 375
const tabletContentWidth = Dimensions.get('window').width - 375



const FavoritesScreen = () => {
  const navigation = useNavigation()
  const {favoritesZpids, favorites, grabFavorites} = useContext(FavoritesContext)

  useEffect(() => {
    auth.currentUser === null 
      ? null
      : grabFavorites()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? null
        : grabFavorites()
    })
    return unsubscribe
  }, [navigation])

  const signinUser = () => {
    navigation.navigate('LoginFavoritesScreen')
  }

  const signupUser = () => {
    navigation.navigate('SignupFavoritesScreen')
  }

  const removeFromFavorites = (property) => {
    let selectedFavorite
    favorites.forEach((fav) => {
      fav.zpid === property.zpid
        ? selectedFavorite = fav 
        : null 
    })
    const docRef = doc(db, 'Favorites', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const displayNone = () => {
    return(
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.header}>You have no favorites!</Text>
        </View>
      </View>
    )
  }

  const displayEmpty = () => {
    return(
      <View style={styles.nonDataScreen}> 
        <Text style={styles.nonDataText}>Save Your Favorite Properties</Text>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signinUser()}}>
          <Text style={styles.close}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signupUser()}}>
          <Text style={styles.close}>Signup</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const displayEmptyTablet = () => {
    return(
      <View style={styles.nonDataScreenTablet}> 
        <Text style={styles.nonDataText}>Save Your Favorite Properties</Text>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signinUser()}}>
          <Text style={styles.close}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signupUser()}}>
          <Text style={styles.close}>Signup</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const displayPropertiesTablet = () => {
    return(
      <ScrollView style={styles.scrollTablet}>
        {
          favorites.map((property) => {
            return(
              <View key={property.property.zpid}>
                <TouchableOpacity style={styles.propertyTablet} onPress={() => {navigation.navigate('PropertyFavoriteScreen', {zpid: property.zpid})}}> 
                  <View>
                    <Image style={{height: tabletImageHeight, width: tabletWidth}} source={{uri: property.property.imgSrc}}/>
                    <View style={styles.summary}>
                      <View style={styles.backgroundTablet}></View>
                      <View style={styles.favoriteMenuTablet}>
                        {
                          favoritesZpids.includes(property.property.zpid)
                          ? <TouchableOpacity stlye={styles.menu} onPress={() => {removeFromFavorites(property)}}><Entypo color={'white'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
                          : <TouchableOpacity stlye={styles.menu} onPress={() => {addFavorite(property)}}><Entypo color={'white'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
                        }
                      </View>
                      <View>
                        <Text style={[styles.text, styles.price, styles.summaryInfoTablet]}>${convertToDollarAmount(property.property.price)}</Text>
                      </View>
                      <View>
                      <Text style={styles.address}>
                          {property.property.streetAddress}
                        </Text>
                        <Text style={styles.address}>
                          {property.property.city}, {property.property.state} {property.property.zipcode}
                        </Text>
                      </View>
                      <View style={styles.bottomRowSummary}>
                        <Text style={styles.address}>
                          {property.property.bedrooms} Beds | {property.property.bathrooms} Bath | {convertNumberToFormattedNumber(property.property.livingArea)} Sqft.
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

  const displayProperties = () => {
    return(
      <ScrollView style={
        deviceHeight > 900 
          ? styles.scroll 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.scrollM 
            : deviceHeight < 800
              ? styles.scrollS
              : null
      }>
        {
          favorites.map((property) => {
            return(
              <View key={property.property.zpid}>
                <TouchableOpacity style={styles.property} onPress={() => {navigation.navigate('PropertyFavoriteScreen', {zpid: property.zpid})}}> 
                  <View>
                    <Image style={{height: aspectHeightMain, width: aspectWidth}} source={{uri: property.property.imgSrc}}/>
                    <View style={styles.summary}>
                      <View style={styles.background}></View>
                      <View style={styles.favoriteMenu}>
                        {
                          favoritesZpids.includes(property.property.zpid)
                          ? <TouchableOpacity stlye={styles.menu} onPress={() => {removeFromFavorites(property)}}><Entypo color={'white'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
                          : <TouchableOpacity stlye={styles.menu} onPress={() => {addFavorite(property)}}><Entypo color={'white'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
                        }
                      </View>
                      <View>
                        <Text style={[styles.text, styles.price, styles.summaryInfo]}>${convertToDollarAmount(property.property.price)}</Text>
                      </View>
                      <View>
                      <Text style={styles.address}>
                          {property.property.streetAddress}
                        </Text>
                        <Text style={styles.address}>
                          {property.property.city}, {property.property.state} {property.property.zipcode}
                        </Text>
                      </View>
                      <View style={styles.bottomRowSummary}>
                        <Text style={styles.address}>
                          {property.property.bedrooms} Beds | {property.property.bathrooms} Bath | {convertNumberToFormattedNumber(property.property.livingArea)} Sqft.
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

  const tabletScreen = () => {
    return(
      <View style={styles.tabletScreen}>
        <View style={styles.mapSplit}>
          <StaticMapsComponent/>
        </View>
        <View style={styles.contentSplit}>
          <View style={styles.headerContainerTablet}>
            <Text style={styles.header}>Favorites</Text>
          </View>
          {
            auth.currentUser === null 
              ? displayEmptyTablet() : favorites.length === 0 
                                    ? displayNone() 
                                    : displayPropertiesTablet()
          }
        </View>
      </View>
    )
  }

  const phoneScreen = () => {
    return(
      <View style={
        deviceHeight > 900 
          ? styles.screen 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.screenM 
            : deviceHeight < 800
              ? styles.screenS
              : null
      }>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Favorites</Text>
        </View>
        {
          auth.currentUser === null 
            ? displayEmpty() : favorites.length === 0 
                                  ? displayNone()
                                  : displayProperties()
        }
      </View>
    )
  }

  return (
    <>
      {
        deviceWidth >= 700 ? tabletScreen() : phoneScreen()
      }
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    marginLeft: 8
  },
  screenM: {
    marginTop: 40,
    marginLeft: 8
  },
  screenS: {
    marginTop: 16,
    marginLeft: 8
  },
  tabletScreen: {
    display: 'flex',
    flexDirection: 'row'
  },
  scroll: {
    height: deviceHeight - 182
  },
  scrollM: {
    height: deviceHeight - 176
  },
  scrollS: {
    height: deviceHeight - 118
  },
  scrollTablet: {
    height: deviceHeight - 182
  },
  mapSplit: {
    width: tabletSplitWidth
  },
  contentSplit: {
    marginTop: 18,
    width: deviceWidth - 375
  },
  propertyTablet: {
    width: tabletWidth - 16,
    height: tabletImageHeight,
    marginLeft: 8,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
  },
  property: {
    width: aspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
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
    height: tabletImageHeight,
    width: tabletWidth - 16,
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
    width: tabletWidth - 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeightMain - 120
  },
  summaryInfoTablet: {
    marginTop: tabletImageHeight - 140
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
  mainContainer: {
    width: aspectWidth,
    height: aspectHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0039a6',
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 8
  },
  close: {
    paddingVertical: 6,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  nonDataScreen: {
    width: aspectWidth,
    height: screenHeight - 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonDataScreenTablet: {
    width: 359,
    marginLeft: 8,
    height: screenHeight - 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonDataText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  headerContainerTablet: {
    width: tabletWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold'
  },
})

export default FavoritesScreen