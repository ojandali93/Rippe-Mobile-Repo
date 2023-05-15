import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import { FeedContext } from '../Context/FeedContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const FeedScreen = () => {
  const navigation = useNavigation()

  const {currentFeed, selectedFeed, 
    updateSelectedFeed, grabFeed, loading} = useContext(FeedContext)

  useEffect(() => {
    grabFeed()
  }, [])

  const goToNewFeed = () => {
    navigation.navigate('NewFeedScreen')
  }

  const showLoading = () => {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  const showResults = () => {
    return(
      <ScrollView>
        {
          selectedFeed.map((property) => {
            return(
              <View key={property.zpid}>
                <TouchableOpacity onPress={() => {}}> 
                  <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.imgSrc}}/>
                  <View>
                    <View>
                      
                    </View>
                    <View>
                      <Text>{property.price}</Text>
                      <Text>{property.homeStatus}</Text>
                    </View>
                    <View>
                      <Text>
                        {property.streetAddress}
                      </Text>
                      <Text>
                        {property.city}, {property.state} {property.zipcode}
                      </Text>
                    </View>
                    <View>
                      <Text>
                        {property.bedrooms} Beds | {property.bathrooms} Bath | {property.livingArea} Sqft.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  return (
    <View>
      <View>
        <Text>Feed Screen</Text>
      </View>
      <TouchableOpacity onPress={() => {goToNewFeed()}}>
        <Text>Add Feed</Text>
      </TouchableOpacity>
      <View>
        {
          currentFeed.map((item) => {
            return(
              <View>
                <TouchableOpacity onPress={() => {updateSelectedFeed(item)}}>
                  <Text>{item.search.location}</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
      {
        loading ? showLoading() : showResults()
      }
    </View>
  )
}

export default FeedScreen
