import React, { useContext } from 'react'
import { View, Image, Dimensions } from 'react-native'

import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const MainImage = () => {

  const {mainImage} = useContext(PropertyContext)

  return (
    <View>
      <Image key={mainImage} style={{height: aspectHeight, width: aspectWidth}} source={{uri: mainImage}} />
    </View>
  )
}

export default MainImage