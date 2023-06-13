import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const MarketAnalysisScreen = () => {

  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  const aspectWidth = deviceWidth - 16

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Favorites</Text>
      </View>
      <Text>
        Analysis screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold'
  },
})

export default MarketAnalysisScreen