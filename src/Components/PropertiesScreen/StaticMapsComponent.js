import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MapView from 'react-native-maps';

const StaticMapsComponent = () => {
  return (
    <View>
      <View>
      <MapView 
          scrollEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          style={styles.mapWindow} 
          initialRegion={{
            latitude: 34.052235,
            longitude: -118.243683,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        ></MapView>
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

export default StaticMapsComponent