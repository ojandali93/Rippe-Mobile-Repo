import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MapView, { Marker } from 'react-native-maps';

import { PropertiesContext } from '../../Context/PropertiesContext'

const MainMapsConponents = () => {
  const {cityLat, cityLong} = useContext(PropertiesContext)
  const {results, refreshMap} = useContext(PropertiesContext)

  const showReset = () => {
    return(
      <></>
    )
  }

  const showMap = () => {
    return(
      <MapView 
        scrollEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        style={styles.mapWindow} 
        initialRegion={{
          latitude: cityLat,
          longitude: cityLong,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {
          results.map((property) => {
            return(
              <Marker 
                pinColor='blue'
                key={property.zpid}
                coordinate={{
                  longitude: property.longitude,
                  latitude: property.latitude
                }}
              />
            )
          })
        }
      </MapView>
    )
  }

  return (
    <View>
      <View>
        {
          refreshMap ? showReset() : showMap()
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapWindow: {
    height: '100%',
    width: '100%',
  }
})

export default MainMapsConponents