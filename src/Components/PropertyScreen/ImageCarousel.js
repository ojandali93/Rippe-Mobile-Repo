import React, { useContext, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { PropertyContext } from '../../Context/PropertyContext'

const aspectWidth = 125
const aspectHeight = (aspectWidth / 1.78) + 1

const ImageCarousel = () => {

  const {setMainImage, imageList} = useContext(PropertyContext)

  return (
    <View style={styles.carouselContainer}>
      <FlatList 
        data={imageList}
        horizontal
        renderItem={(item) => {
          return(
            <TouchableOpacity key={item.item.index} onPress={() => setMainImage(item.item.url)}>
              <Image style={styles.image} source={{uri: item.item.url}} />
            </TouchableOpacity>
          )  
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: aspectHeight,
    width: aspectWidth,
    marginRight: 8
  },
  carouselContainer: {
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  }
})

export default ImageCarousel