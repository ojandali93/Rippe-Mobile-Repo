import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { FeedContext } from '../Context/FeedContext'
import { Entypo, Feather } from 'react-native-vector-icons'
import { auth, db } from '../Api/firebaseTesting'
import { doc, deleteDoc } from 'firebase/firestore'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


import { FavoritesContext } from '../Context/FavoritesContext'
import PropertyTileComponent from './FeedScreens/PropertyTileComponent'
import { convertNumberToFormattedNumber, convertToDollarAmount } from '../../utilities'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 210
const aspectHeightMain = (deviceWidth / 1.78) + 1

const tabletAspectWidth = 375
const tabletAspectHeight = (tabletAspectWidth / 1.78) + 1

const FeedScreen = () => {
  const navigation = useNavigation()

  const {favoritesZpids, addFeedFavorite, removeFromFavorites} = useContext(FavoritesContext)

  const {currentFeed, selectedFeed, 
    updateSelectedFeed, grabFeed, loading, emptyList, errorMessage} = useContext(FeedContext)

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
      <View style={
        deviceHeight > 900 
          ? styles.loadingScreen 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.loadingScreenM 
            : deviceHeight < 800
              ? styles.loadingScreenS
              : null
      }>
        <Text style={styles.loadingText}>Loading properties</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
      </View>
    )
  }

  const showLoadingTablet = () => {
    return(
      <View style={styles.tabletLoadingScreen}>
        <Text style={styles.loadingText}>Loading properties</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
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

  const showValidProperties = () => {
    return(
      <ScrollView style={
        deviceHeight > 900 
          ? styles.scrollView 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.scrollViewM 
            : deviceHeight < 800
              ? styles.scrollViewS
              : null
      }>
        {
          selectedFeed.map((property) => {
            return(
              <View key={property.zpid}>
                <TouchableOpacity style={styles.property} onPress={() => {navigation.navigate('PropertyFeedScreen', {zpid: property.zpid})}}> 
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
                        <Text style={[styles.text, styles.price, styles.summaryInfo]}>${convertToDollarAmount(property.price)}</Text>
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
                          {property.bedrooms} Beds | {property.bathrooms} Bath | {convertNumberToFormattedNumber(property.livingArea)} Sqft.
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

  const showValidPropertiesTablet = (item) => {
    return(
      <>
        <PropertyTileComponent item={item}/>
      </>
    )
  }

  const showNoValidProperties = () => {
    return(
      <View style={styles.nonDataScreen}>
        <Text style={styles.nonDataText}>No properties meet the criteria</Text>
      </View>
    )
  }

  const removeFromFeeds = (search) => {
    let selectedFavorite
    currentFeed.forEach((save) => {
      save.referenceNumber === search.referenceNumber
        ? selectedFavorite = save 
        : null 
    })
    const docRef = doc(db, 'Feed', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const displayError = () => {
    return(
      <View style={styles.errorScreen}>
        <Text style={styles.errorText}>Due to high demand, our services are temporarily unavailable. Please try again later.</Text>
      </View>
    )
  }

  const displayTabletError = () => {
    return(
      <View style={styles.tabletErrorScreen}>
        <Text style={styles.errorText}>Due to high demand, our services are temporarily unavailable. Please try again later.</Text>
      </View>
    )
  }

  const showPhoneScreen = () => {
    return(
      <View style={
        deviceHeight > 900 
          ? styles.screen 
          : deviceHeight > 800 && deviceHeight < 900 
            ? styles.screenM 
            : deviceHeight < 800
              ? styles.screenS
              : null
      }>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Feed</Text>
        </View>
        <View style={styles.listContainer}>
          <ScrollView horizontal>
          {
            currentFeed.map((item) => {
              return(
                <View key={item.search.referenceNumber} style={
                  deviceHeight > 900 
                    ? styles.itemCOntainer 
                    : deviceHeight > 800 && deviceHeight < 900 
                      ? styles.itemCOntainerM 
                      : deviceHeight < 800
                        ? styles.itemCOntainerS
                        : null
                }>
                  <TouchableOpacity style={styles.cityContainer} onPress={() => {updateSelectedFeed(item)}}>
                    <Text style={styles.cityText}>{item.search.location} {item.search.beds_min} Bed/{item.search.baths_min} Bath</Text>
                    <TouchableOpacity onPress={() => {removeFromFeeds(item)}}>
                      <Feather style={{marginRight: 8}} size={20} name={'x-circle'}/>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              )
            })
          }
          </ScrollView>
        </View>
        {
          auth.currentUser === null 
            ? displayEmpty()
            : !loading 
              ? selectedFeed.length === 0 
                ? showNoValidProperties()
                : showValidProperties()
              : errorMessage != ''
                ? displayError()
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

  const showTabletScreen = () => {
    return(
      <View style={styles.tabletScreen}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Feed</Text>
        </View>
        <View style={
          deviceHeight > 1300
            ? styles.listContainerTablet
            : styles.listContainearTabletS
        }>
          <ScrollView>
          {
            currentFeed.map((item) => {
              return(
                <View key={item.search.referenceNumber} style={styles.itemCOntainerTablet}>
                  <View style={styles.cityContainer} >
                    <Text style={styles.cityText}>{item.search.location} {item.search.beds_min} Bed/{item.search.baths_min} Bath</Text>
                    <TouchableOpacity onPress={() => {removeFromFeeds(item)}}>
                      <Feather style={{marginRight: 8}} size={20} name={'x-circle'}/>
                    </TouchableOpacity>
                  </View>
                  {
                    errorMessage
                      ? displayTabletError()
                      : showValidPropertiesTablet(item)
                  }
                </View>
              )
            })
          }
          </ScrollView>
        </View>
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

  return (
    <>
      {
        deviceWidth >= 500 ? showTabletScreen() : showPhoneScreen()
      }
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    marginLeft: 8,
    width: aspectWidth,
  },
  screenM: {
    marginTop: 40,
    marginLeft: 8,
    width: aspectWidth,
  },
  screenS: {
    marginTop: 16,
    marginLeft: 8,
    width: aspectWidth,
  },
  tabletScreen: {
    marginTop: 18,
    width: aspectWidth,
    marginLeft: 8,
  },
  scrollView: {
    height: deviceHeight - 294,
  },
  scrollViewM: {
    height: deviceHeight - 284,
  },
  scrollViewS: {
    height: deviceHeight - 228,
  },
  scrollViewTablet: {
    height: tabletAspectHeight + 8,
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0039a6',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 8
  },
  cityText: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  itemCOntainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  itemCOntainerM: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  itemCOntainerS: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  itemCOntainerTablet: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: '', 
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  listContainerTablet: {
    height: deviceHeight - 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: '',
    borderRadius: 8
  },
  listContainearTabletS: {
    height: deviceHeight - 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: '',
    borderRadius: 8
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
  propertyTablet: {
    width: tabletAspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    marginRight: 8,
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
    marginTop: aspectHeightMain - 140
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
  errorScreen: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 284,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingScreen: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 294,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingScreenM: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 284,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingScreenS: {
    width: deviceWidth - 16,
    marginLeft: 8,
    height: deviceHeight - 228,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  tabletLoadingScreen: {
    width: aspectWidth,
    marginLeft: 8,
    height: tabletAspectHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabletLoadingText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
})

export default FeedScreen
