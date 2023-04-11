import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import TopbarComponent from '../Components/PropertiesScreen.js/TopbarComponent'
import ResultsComponent from '../Components/PropertiesScreen.js/ResultsComponent'


const PropertiesScreen = () => {

  const {results, getProperties, loading} = useContext(PropertiesContext)

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

  return (
    <View>
      <TopbarComponent />
      {
        loading ? displayLoading() : displayPropertyList()
      }
    </View>
  )
}

const styles = StyleSheet.create({
})

export default PropertiesScreen