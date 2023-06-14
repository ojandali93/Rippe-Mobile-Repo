import React, { useContext, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Entypo } from 'react-native-vector-icons'

import { PropertyContext } from '../../Context/PropertyContext'
import { FavoritesContext } from '../../Context/FavoritesContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth * .5
const aspectHeight = (aspectWidth / 1.78) + 1

const ImageCarouseTabletComponent = () => {

  const {imageList} = useContext(PropertyContext)
  const {property} = useContext(PropertyContext)

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
    <View style={styles.carouselContainer}>
      <FlatList 
        data={imageList}
        renderItem={(item) => {
          return(
            <TouchableOpacity key={item.item.index}>
              <Image style={styles.image} source={{uri: item.item.url}} />
            </TouchableOpacity>
          )  
        }}
      />
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
  image: {
    height: aspectHeight,
    width: deviceWidth - 425,
    marginRight: 8,
    marginBottom: 8
  },
  carouselContainer: {
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    height: deviceheight - 275
  },
  favoriteMenu: {
    marginTop: 8,
    width: deviceWidth - 425,
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

export default ImageCarouseTabletComponent