import React, { useContext, useEffect, useState } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import PropertyTileTabletComponent from './PropertyTileTabletComponent'
import PropertyTilePhoneComponent from './PropertyTilePhoneComponent'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const ResultsComponent = () => {
  const {results, invalidLocation} = useContext(PropertiesContext)

  const showTabletLocationError = () => {
    return(
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Enter Valid Locaiton</Text>
      </View>
    )
  }

  const showTabletResults = () => {
    return(
      <ScrollView style={styles.tabletScroll}>
        {
          results.map((property) => {
            return(
              <View key={property.zpid}>
                {
                  <PropertyTileTabletComponent property={property} />
                }
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  const tabletScreen = () => {
    return(
      <>
        {
          invalidLocation ? showTabletLocationError() : showTabletResults()
        }
      </>
    )
  }


  const showPhoneLocationError = () => {
    return(
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Enter Valid Locaiton</Text>
      </View>
    )
  }

  const showPhoneResults = () => {
    return(
      <ScrollView style={styles.scroll}>
        {
          results.map((property) => {
            return(
              <View key={property.zpid}>
                {
                  <PropertyTilePhoneComponent property={property}/>
                }
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  const phoneScreen = () => {
    return(
      <>
        {
          invalidLocation ? showPhoneLocationError() : showPhoneResults()
        }
      </>
    )
  }

  return (
    <>
      {
        deviceWidth >= 500 ? tabletScreen() : phoneScreen()
      }
    </>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginLeft: 8,
    marginBottom: 250
  },
  tabletScroll: {
    marginLeft: 8,
    marginBottom: 250
  },
  invalid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingScreen: {
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
})

export default ResultsComponent