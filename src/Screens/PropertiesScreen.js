import React, { useContext, useEffect } from 'react'
import {Text, View, Dimensions, StyleSheet, ActivityIndicator} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import TopbarComponent from '../Components/PropertiesScreen/TopbarComponent'
import ResultsComponent from '../Components/PropertiesScreen/ResultsComponent'
import MainMapsConponents from '../Components/PropertiesScreen/MainMapsConponents'

import { ProfileContext } from '../Context/ProfileContext'
import { FavoritesContext } from '../Context/FavoritesContext'
import { useNavigation } from '@react-navigation/native'

import { auth } from '../Api/firebaseTesting'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PropertiesScreen = () => {
  const navigation = useNavigation()

  const {viewMaps, getProperties, loading} = useContext(PropertiesContext)
  const {setLoggedIn} = useContext(ProfileContext)

  useEffect(() => {
    getProperties()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser
        ? setLoggedIn(true)
        : setLoggedIn(false)
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
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading properties</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
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
    height: deviceHeight,
    width: deviceWidth,
  },
  loadingScreen: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  loading: {
    marginLeft: 16
  }
})

export default PropertiesScreen