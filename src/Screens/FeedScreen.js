import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import { FeedContext } from '../Context/FeedContext'
import { Entypo } from 'react-native-vector-icons'
import { auth, db } from '../Api/firebaseTesting'


import { FavoritesContext } from '../Context/FavoritesContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 210
const aspectHeightMain = (deviceWidth / 1.78) + 1

const FeedScreen = () => {
  const navigation = useNavigation()

  const {favoritesZpids, favorites,removeFromFavorites, addFeedFavorite} = useContext(FavoritesContext)

  const {currentFeed, selectedFeed, 
    updateSelectedFeed, grabFeed, loading, emptyList} = useContext(FeedContext)

  useEffect(() => {
    auth.currentUser === null 
      ? null
      : grabFeed()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? null
        : grabFeed()
    })
    return unsubscribe
  }, [navigation])

  const goToNewFeed = () => {
    navigation.navigate('NewFeedScreen')
  }

  const signinUser = () => {
    navigation.navigate('LoginFeedScreen')
  }

  const signupUser = () => {
    navigation.navigate('SignupFeedScreen')
  }

  const showLoading = () => {
    return(
      <View style={styles.nonDataScreen}>
        <Text style={styles.nonDataText}>Loading</Text>
      </View>
    )
  }

  const displayNoList = () => {
    return(
      <View style={styles.nonDataScreen}> 
        <Text style={styles.nonDataText}>No Saved Seaches In Feed!</Text>
      </View>
    )
  }

  const displayEmpty = () => {
    return(
      <View style={styles.nonDataScreen}> 
        <Text style={styles.nonDataText}>Keep An Eye On Specific Cities</Text>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signinUser()}}>
          <Text style={styles.close}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeContainer} onPress={() => {signupUser()}}>
          <Text style={styles.close}>Signup</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showResults = () => {
    return(
      <ScrollView style={styles.scrollView}>
        {
          selectedFeed.map((property) => {
            return(
              <View key={property.zpid}>
                <TouchableOpacity style={styles.property} onPress={() => {}}> 
                  <View>
                    <Image style={{height: aspectHeightMain, width: aspectWidth}} source={{uri: property.imgSrc}}/>
                    <View style={styles.summary}>
                      <View style={styles.background}></View>
                      <View style={styles.favoriteMenu}>
                        {
                          favoritesZpids.includes(property.zpid)
                          ? <TouchableOpacity stlye={styles.menu} onPress={() => {removeFromFavorites(property)}}><Entypo color={'white'} size={28} style={{paddingTop: 4, opacity: 1}} name='heart'/></TouchableOpacity>
                          : <TouchableOpacity stlye={styles.menu} onPress={() => {addFeedFavorite(property)}}><Entypo color={'white'} size={28}  style={{paddingTop: 4, opacity: 1}} name='heart-outlined'/></TouchableOpacity>
                        }
                      </View>
                      <View>
                        <Text style={[styles.text, styles.price, styles.summaryInfo]}>${property.price}</Text>
                      </View>
                      <View>
                      <Text style={styles.address}>
                          {property.streetAddress}
                        </Text>
                        <Text style={styles.address}>
                          {property.city}, {property.state} {property.zipcode}
                        </Text>
                      </View>
                      <View style={styles.bottomRowSummary}>
                        <Text style={styles.address}>
                          {property.bedrooms} Beds | {property.bathrooms} Bath | {property.livingArea} Sqft.
                        </Text>
                      </View>
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
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        {
          currentFeed.map((item) => {
            return(
              <View style={styles.itemCOntainer}>
                <TouchableOpacity style={styles.cityContainer} onPress={() => {updateSelectedFeed(item)}}>
                  <Text style={styles.cityText}>{item.search.location} {item.search.beds_min} Bed/{item.search.baths_min} Bath</Text>
                </TouchableOpacity>
                <View style={styles.split}></View>
              </View>
            )
          })
        }
      </View>
      {
        auth.currentUser === null 
          ? displayEmpty()
          : !loading 
            ? showResults() 
            : emptyList 
              ? displayNoList()
              : showLoading()
      }
      {
        auth.currentUser === null 
          ? null 
          : <TouchableOpacity style={[styles.closeContainer]} onPress={() => {goToNewFeed()}}>
              <Text style={styles.close}>Add Feed Search</Text>
            </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    width: aspectWidth,
    marginLeft: 8,

  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4132e1',
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 8
  },
  close: {
    paddingVertical: 6,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  nonDataScreen: {
    width: aspectWidth,
    height: screenHeight - 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nonDataText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  cityContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  cityText: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'lightgrey',
  },
  itemCOntainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  split: {
    height: 22,
    width: 2,
    backgroundColor: 'blue',
    marginHorizontal: 8
  },
  property: {
    width: aspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
  },
  summary: {
    position: 'absolute',
    padding: 8
  },
  background: {
    position: 'absolute',
    height: aspectHeightMain,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeightMain - 120
  },
  text: {
    color: 'white'
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  address: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16
  },
  bottomRowSummary: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainContainer: {
    width: aspectWidth,
    height: aspectHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    height: screenHeight - 40
  }
})

export default FeedScreen
