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
const splitWidth = 740
const splitContentWidth = 375
const splitMapWidth = deviceWidth - 375

const PropertiesScreen = () => {
  const navigation = useNavigation()

  const {viewMaps, getProperties, loading, errorMessage} = useContext(PropertiesContext)
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

  const displayTabletLoading = () => {
    return(
      <View style={styles.tabletLoadingScreen}>
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

  const displayError = () => {
    return(
      <View style={styles.errorScreen}>
        <Text style={styles.errorText}>Due to high demand, our services are temporarily unavailable. Please try again later.</Text>
      </View>
    )
  }

  const displayTabletError = () => {
    return(
      <View style={styles.tabletErrorScreen}>
        <Text style={styles.errorText}>Due to high demand, our services are temporarily unavailable. Please try again later.</Text>
      </View>
    )
  }

  const iphoneMain = () => {
    return(
      <View style={styles.screen}>
        <TopbarComponent />
        {
          errorMessage
            ? displayError()
            : loading 
                ? displayTabletLoading() 
                : viewMaps === false 
                  ? displayPropertyList()
                  : displayMap()
        }
      </View>
    )
  }

  const iPadMain = () => {
    return(
      <View style={styles.ipad}>
        <View style={styles.mapSplit}>
          <MainMapsConponents />
        </View>
        <View style={styles.contentSplit}>
          <TopbarComponent />
          {
            errorMessage
              ? displayTabletError()
              : loading 
                  ? displayTabletLoading() 
                  : viewMaps === false 
                    ? displayPropertyList()
                    : displayMap()
          }
        </View>
      </View>
    )
  }

  return (
    <>
      {
        deviceWidth >= 500 ? iPadMain() : iphoneMain()
      }
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    marginTop: 58,
  },
  ipad: {
    width: deviceWidth,
    display: 'flex',
    flexDirection: 'row',
  },
  mapSplit: {
    width: splitMapWidth,
  },
  contentSplit: {
    width: splitContentWidth,
    paddingTop: 24
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
  errorScreen: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabletLoadingScreen: {
    width: splitContentWidth,
    marginLeft: 8,
    height: deviceHeight - 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabletErrorScreen: {
    width: splitContentWidth - 40,
    marginLeft: 8,
    height: deviceHeight - 250,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
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