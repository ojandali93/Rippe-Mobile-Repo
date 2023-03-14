import React, { useContext, useEffect } from 'react'
import {Text, View} from 'react-native'
import { PropertiesContext } from '../Context/PropertiesContext'

import { collection, addDoc } from "firebase/firestore";
import { db } from '../Api/firebaseTesting';

const PropertiesScreen = () => {

  const {propertyList, getProperties} = useContext(PropertiesContext)

  useEffect(() => {
    getProperties()
  }, [])

  const addProductionDb = () => {
    const collectionRef = collection(db, 'Properties')
    addDoc(collectionRef, {
      property: propertyList[0]
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error)
    })
  }

  const displayPropertyList = () => {
    addProductionDb()
    return(
      <View>
        {
          propertyList.map((property) => {
            return(
              <View key={property.zpid}> 
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

export default PropertiesScreen