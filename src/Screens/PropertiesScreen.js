import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import { collection, addDoc } from "firebase/firestore";
import { db } from '../Api/firebaseTesting';

const PropertiesScreen = () => {

  const {propertyList, getProperties} = useContext(PropertiesContext)

  useEffect(() => {
    getProperties()
  }, [])


  const displayPropertyList = () => {
    // addProductionDb()
    return(
      <View>
        {
          propertyList.map((property) => {
            return(
              <View key={property.zpid}> 
                <Image style={styles.image} source={{uri: property.imgSrc}}/>
                <Text>{property.zpid}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View>
      {
        propertyList ? displayPropertyList() : <Text>No Results</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: '100%'
  }
})

export default PropertiesScreen