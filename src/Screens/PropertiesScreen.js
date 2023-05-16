import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import TopbarComponent from '../Components/PropertiesScreen/TopbarComponent'
import ResultsComponent from '../Components/PropertiesScreen/ResultsComponent'
import MainMapsConponents from '../Components/PropertiesScreen/MainMapsConponents'
import { ProfileContext } from '../Context/ProfileContext'
import { useNavigation } from '@react-navigation/native'

import { auth } from '../Api/firebaseTesting'


const PropertiesScreen = () => {
  const navigation = useNavigation()

  const {viewMaps, getProperties, loading} = useContext(PropertiesContext)
  const {setLoggedIn} = useContext(ProfileContext)

  useEffect(() => {
    getProperties()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? setLoggedIn(false)
        : setLoggedIn(true)
    })
    return unsubscribe
  }, [navigation])

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
    <View style={styles.screen}>
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
  screen: {
    width: '100%',
    marginTop: 58,
  },
  map: {
    height: 400,
    width: 400,
  }
})

export default PropertiesScreen