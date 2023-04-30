import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { AnalysisContext } from '../../Context/AnalysisContext'

const TopRatedComponents = () => {

  const { loading, topRatedListings } = useContext(AnalysisContext)

  const displayListings = () => {
    return(
      <View>
        {
          topRatedListings.map((item) => {
            return(
              <View key={item.id}>
                <Text>{item.name}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  const displayLoading = () => {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View>
      {
        loading ? displayLoading() : displayListings()
      }
    </View>
  )
}

export default TopRatedComponents