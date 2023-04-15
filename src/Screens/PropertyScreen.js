import React, { useContext, useEffect } from 'react'
import { PropertyContext } from '../Context/PropertyContext'
import { Text, View } from 'react-native'

import MainImage from '../Components/PropertyScreen/MainImage'

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