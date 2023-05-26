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

const FavoritesScreen = () => {
  const navigation = useNavigation()

  const {loggedIn, setLoggedIn} = useContext(ProfileContext)
  const {favoritesZpids, favorites} = useContext(FavoritesContext)

  useEffect(() => {
    auth.currentUser === null 
      ? setLoggedIn(false)
      : setLoggedIn(true)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? setLoggedIn(false)
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

  const displayAccountSetup = () => {
    return(
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.header}>You are currently not logged in!</Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.closeContainer, {marginTop: 16}]} onPress={() => {signinUser()}}>
            <Text style={styles.close}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={[styles.closeContainer]} onPress={() => {signupUser()}}>
            <Text style={styles.close}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
        loggedIn ? displayProperties() : displayAccountSetup()
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
    paddingVertical: 8
  },
  close: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  }
})

export default FavoritesScreen