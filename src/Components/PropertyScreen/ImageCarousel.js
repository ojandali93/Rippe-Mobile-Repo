import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const aspectWidth = 75
const aspectHeight = (aspectWidth / 1.78) + 1

const ImageCarousel = () => {

  const {images, setMainImage} = useContext(PropertyContext)

  return (
    <View>
      <Text>Image Carousel</Text>
      <FlatList 
        data={images}
        horizontal
        keyExtractor={(item) => {item.index}}
        renderItem={(item) => {
          return(
            <TouchableOpacity onPress={() => setMainImage(item.item.url)}>
              <Image style={{height:aspectHeight, width:aspectWidth}} source={{uri: item.item.url}} />
            </TouchableOpacity>
          )  
        }}
      />
    </View>
  )
}

export default ImageCarousel