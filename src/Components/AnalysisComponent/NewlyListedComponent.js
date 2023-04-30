import React, { useContext } from 'react'
import { AnalysisContext } from '../../Context/AnalysisContext'
import { Text, View } from 'react-native'

const NewlyListedComponent = () => {

  const {newlyListed, loading} = useContext(AnalysisContext)

  const displayListings = () => {
    return(
      <View>
        {
          newlyListed.map((item) => {
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

export default NewlyListedComponent