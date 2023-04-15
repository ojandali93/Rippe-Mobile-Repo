import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import TopbarComponent from '../Components/PropertiesScreen/TopbarComponent'
import ResultsComponent from '../Components/PropertiesScreen/ResultsComponent'
import MainMapsConponents from '../Components/PropertiesScreen/MainMapsConponents'


const PropertiesScreen = () => {

  const {viewMaps, getProperties, loading} = useContext(PropertiesContext)

  useEffect(() => {
    getProperties()
  }, [])

  const displayPropertyList = () => {
    return(
      <View>
        <ResultsComponent />
      </View>
    )
  }

  const displayLoading = () => {
    return(
      <View>
        <Text>Loading properties</Text>
      </View>
    )
  }

  const displayMap = () => {
    return(
      <View style={styles.map}>
        <MainMapsConponents />
      </View>
    )
  }

  return (
    <View>
      <TopbarComponent />
      {
        loading 
          ? displayLoading() 
          : viewMaps === false 
            ? displayPropertyList()
            : displayMap()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: 400,
  }
})

export default PropertiesScreen