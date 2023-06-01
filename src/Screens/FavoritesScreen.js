import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet} from 'react-native'
import { auth, db } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'
import { doc, deleteDoc } from 'firebase/firestore';
import { FavoritesContext } from '../Context/FavoritesContext'
import { Entypo } from 'react-native-vector-icons'


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = deviceHeight - 100
const aspectHeightMain = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 202


const FavoritesScreen = () => {
  const navigation = useNavigation()

  const {loggedIn, setLoggedIn} = useContext(ProfileContext)
  const {favoritesZpids, favorites} = useContext(FavoritesContext)

  useEffect(() => {
    auth.currentUser === null 
      ? null
      : setLoggedIn(true)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? null
        : setLoggedIn(true)
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
        console.log('deleted favorite')
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

  const displayProperties = () => {
    return(
      <ScrollView>
        {
          favorites.map((property) => {
            return(
              <View key={property.property.zpid}>
                <TouchableOpacity style={styles.property} onPress={() => {}}> 
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
                        <Text style={[styles.text, styles.price, styles.summaryInfo]}>${property.property.price}</Text>
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
                          {property.property.bedrooms} Beds | {property.property.bathrooms} Bath | {property.property.livingArea} Sqft.
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
    <View style={styles.screen}>
      {
        auth.currentUser === null 
          ? displayEmpty() : favorites.length === 0 
                                ? displayNone() 
                                : displayProperties()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    marginLeft: 8
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
    height: aspectHeightMain,
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
    marginTop: aspectHeightMain - 120
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
    backgroundColor: '#4132e1',
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
  nonDataText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
})

export default FavoritesScreen