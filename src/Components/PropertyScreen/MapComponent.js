import React, { useContext, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'

import MapView, { Marker } from 'react-native-maps';
import { PropertyContext } from '../../Context/PropertyContext';

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const MapComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View style={styles.mapContainer}>
      <View>
      <MapView 
          scrollEnabled={false}
          zoomEnabled={true}
          zoomTapEnabled={false}
          style={styles.mapWindow} 
          initialRegion={{
            latitude: property.latitude,
            longitude: property.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {
            <Marker 
              pinColor='blue'
              key={property.zpid}
              coordinate={{
                longitude: property.longitude,
                latitude: property.latitude
              }}
            />
          }
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapWindow: {
    height: aspectWidth,
    width: aspectWidth,
    marginLeft: 8,
    marginTop: 8
  }
})

export default MapComponent