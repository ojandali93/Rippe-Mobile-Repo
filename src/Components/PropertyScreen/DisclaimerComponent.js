import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const DisclaimerComponent = () => {

  const {property} = useContext(PropertyContext)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {property.attributionInfo.mlsDisclaimer}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    margin: 8
  },
  text: {
    fontSize: 18
  }
})

export default DisclaimerComponent