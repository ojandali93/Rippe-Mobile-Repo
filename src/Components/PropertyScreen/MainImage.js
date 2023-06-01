import React, { useContext } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

import { Entypo } from 'react-native-vector-icons'

import { FavoritesContext } from '../../Context/FavoritesContext'
import { ProfileContext } from '../../Context/ProfileContext';
import { PropertyContext } from '../../Context/PropertyContext';
import { auth } from '../../Api/firebaseTesting';

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const MainImage = () => {
  const {loggedIn} = useContext(ProfileContext)
  const {mainImage, property} = useContext(PropertyContext)
  
  const {
    favoritesZpids,
    addFavorite,
    removeFromFavorites
  } = useContext(FavoritesContext)

  const updateAddFavorite = (property) => {
    auth.currentUser === null
      ? alert('Not Logged In') 
      : addFavorite(property) 
  }

  const updateRemoveFavorite = (property) => {
    auth.currentUser === null
      ? alert('Not Logged In')
      : removeFromFavorites(property) 
  }

  return (
    <View>
      <Image key={mainImage} style={{height: aspectHeight, width: deviceWidth}} source={{uri: mainImage}} />
      <View style={styles.favoriteMenu}>
        <View style={styles.menu}>
          {
            favoritesZpids.includes(property.zpid)
              ? <TouchableOpacity stlye={styles.menu} onPress={() => {updateRemoveFavorite(property)}}><Entypo color={'black'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
              : <TouchableOpacity stlye={styles.menu} onPress={() => {updateAddFavorite(property)}}><Entypo color={'black'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
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