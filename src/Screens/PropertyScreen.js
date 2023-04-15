import React, { useContext, useEffect } from 'react'
import { PropertyContext } from '../Context/PropertyContext'
import { Text, View } from 'react-native'

import MainImage from '../Components/PropertyScreen/MainImage'
import ImageCarousel from '../Components/PropertyScreen/ImageCarousel'

const PropertyScreen = () => {

  const {setPropertyDetails, loading} = useContext(PropertyContext)

  useEffect(() => {
    setPropertyDetails()
  }, [])

  const displayProperty = () => {
    return(
      <View>
        <Text>Loaded Property</Text>
        <MainImage />
        <ImageCarousel />
      </View>
    )
  }

  return (
    <View>
      {
        loading === true ? <Text>Loading</Text> : displayProperty()
      }
    </View>
  )
}

export default PropertyScreen