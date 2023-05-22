import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'

import { PropertiesContext } from '../Context/PropertiesContext'
import { PropertyContext } from '../Context/PropertyContext'

import MainImage from '../Components/PropertyScreen/MainImage'
import ImageCarousel from '../Components/PropertyScreen/ImageCarousel'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const PropertyScreen = ({route}) => {

  const {loading, setLoading, setPropertyDetails} = useContext(PropertyContext)

  useEffect(() => {
    setPropertyDetails(route.params.zpid)
  }, [])

  const displayProperty = () => {
    return(
      <View style={styles.screen}>
        {/* <View style={styles.investmentCOntainer}>
        </View> */}
        <ScrollView>
          <MainImage />
          <ImageCarousel />
        </ScrollView>
      </View>
    )
  }

  const displayLoading = () => {
    return(
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading Property</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
      </View>
    )
  }

  return (
    <View>
      {
        loading === true ? displayLoading() : displayProperty()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58
  },
  investmentCOntainer: {
    zIndex: 1,
    opacity: 1
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

export default PropertyScreen