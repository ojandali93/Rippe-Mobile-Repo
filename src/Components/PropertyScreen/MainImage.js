import React, { useContext } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

import { auth, db } from '../../Api/firebaseTesting'
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';

import { Entypo } from 'react-native-vector-icons'

import { PropertiesContext } from '../../Context/PropertiesContext'
import { ProfileContext } from '../../Context/ProfileContext';
import { PropertyContext } from '../../Context/PropertyContext';

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const MainImage = () => {

  const {favoritesZpids, favorites} = useContext(PropertiesContext)
  const {loggedIn} = useContext(ProfileContext)
  const {mainImage, property} = useContext(PropertyContext)

  const addToFavorites = (property) => {
    loggedIn === false 
      ? null 
      : addFavorite(property)
  }

  const addFavorite = (property) => {
    console.log('about to add to favorites: ', auth.currentUser)
    auth.currentUser === null
      ? null 
      : console.log('add to favorites')
        const collectionRef = collection(db, 'Favorites')
        let favoriteProperty = {}
        favoriteProperty.bathrooms = property.bathrooms
        favoriteProperty.bedrooms = property.bedrooms
        favoriteProperty.city = property.city
        favoriteProperty.country = property.country
        favoriteProperty.datePriceChanged = property.datePriceChanged
        favoriteProperty.daysOnZillow = property.daysOnZillow
        favoriteProperty.homeStatus = property.homeStatus
        favoriteProperty.homeType = property.homeType
        favoriteProperty.imgSrc = property.hugePhotos[0].url
        favoriteProperty.investment = property.investment
        favoriteProperty.latitude = property.latitude
        favoriteProperty.livingArea = property.livingArea + ' ' + property.livingAreaUnitsShort
        favoriteProperty.longitude = property.longitude
        favoriteProperty.lotAreaUnit = property.lotAreaUnits
        favoriteProperty.lotAreaValue = property.lotAreaValue
        favoriteProperty.price = property.price
        favoriteProperty.priceChange = property.priceChange
        favoriteProperty.rentZestimate = property.rentZestimate
        favoriteProperty.state = property.state
        favoriteProperty.streetAddress = property.streetAddress
        favoriteProperty.zestimate = property.zestimate
        favoriteProperty.zipcode = property.zipcode
        favoriteProperty.zpid = property.zpid
        addDoc(collectionRef, {
          'property': favoriteProperty,
          'userId': auth.currentUser.uid,
          'zpid': property.zpid,
          'createdAt': serverTimestamp()
        })
        .then((response) => {
          console.log('successfully added')
        })
        .catch((error) => {
          console.error(error)
        })
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

  return (
    <View>
      <Image key={mainImage} style={{height: aspectHeight, width: deviceWidth}} source={{uri: mainImage}} />
      <View style={styles.favoriteMenu}>
        <View style={styles.menu}>
          {
            favoritesZpids.includes(property.zpid)
              ? <TouchableOpacity stlye={styles.menu} onPress={() => {removeFromFavorites(property)}}><Entypo color={'black'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
              : <TouchableOpacity stlye={styles.menu} onPress={() => {addToFavorites(property)}}><Entypo color={'black'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  favoriteMenu: {
    width: deviceWidth,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  menu: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50
  }
})

export default MainImage