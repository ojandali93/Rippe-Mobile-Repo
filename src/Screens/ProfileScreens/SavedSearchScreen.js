import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet} from 'react-native'
import { auth, db } from '../../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const newWidth = deviceWidth - 2

const SavedSearchScreen = () => {
  const navigation = useNavigation()

  const [savedSearch, setSavedSearch] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    grabSavedSearch()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? signinUser()
        : grabSavedSearch()
    })
    return unsubscribe
  }, [navigation])

  const signinUser = () => {
    navigation.navigate('LoginScreen')
  }

  const goToNewFeed = () => {
    navigation.navigate('NewFeedProfileScreen')
  }

  const grabSavedSearch = () => {
    const collectionRef = collection(db, 'Feed')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let saveSearchList = []
      snapshot.docs.forEach((doc) => {
        saveSearchList.push({ ...doc.data(), id: doc.id })
      })
      setSavedSearch(saveSearchList)
    })
    setLoading(false)
  }

  const removeFromFavorites = (search) => {
    let selectedFavorite
    savedSearch.forEach((save) => {
      save.referenceNumber === search.referenceNumber
        ? selectedFavorite = save 
        : null 
    })
    console.log(selectedFavorite)
    const docRef = doc(db, 'Feed', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
        console.log('deleted favorite')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const displayNone = () => {
    return(
      <View style={styles.screen}>
        <View style={styles.scroll}>
          <Text >You have no recent views!</Text>
        </View>
      </View>
    )
  }

  const showLoading = () => {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  const displayPropertyTypes = (propertyTypes) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'home'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{propertyTypes.join(', ')}</Text>
      </>
    )
  }

  const displayBeds = (search) => {
    return(
      <>
        <Ionicons style={styles.icon} size={24} name={'bed-outline'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{search.search.beds_min}+ Bedrooms</Text>
      </>
    )
  }

  const displayBaths = (search) => {
    return(
      <>
        <MaterialCommunityIcons style={styles.icon} size={24} name={'shower'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{search.search.bath_min}+ Bathrooms</Text>
      </>
    )
  }

  const displayPrice = (search) => {
    return(
      <>
        <MaterialIcons style={styles.icon} size={24} name={'attach-money'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>${search.search.price_min} - ${search.search.price_max}</Text>
      </>
    )
  }

  const displayPriceMin = (search) => {
    return(
      <>
        <MaterialIcons style={styles.icon} size={24} name={'attach-money'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>${search.search.price_min}+ </Text>
      </>
    )
  }

  const displayPriceMax = (search) => {
    return(
      <>
        <MaterialIcons style={styles.icon} size={24} name={'attach-money'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>$0 - ${search.search.price_max}</Text>
      </>
    )
  }

  const displaySqft = (search) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'maximize'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{search.search.sqft_min} - {search.search.sqft_max} sqft.</Text>
      </>
    )
  }

  const displaySqftMin = (search) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'maximize'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{search.search.sqft_min}+ sqft.</Text>
      </>
    )
  }

  const displaySqftMax = (search) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'maximize'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>0 - {search.search.sqft_max} sqft.</Text>
      </>
    )
  }

  const displayMaxHOA = (search) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'globe'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>$0 - ${search.search.sqft_min} HOA</Text>
      </>
    )
  }

  const displayAmenities = (amenities) => {
    return(
      <>
        <Feather style={styles.icon} size={24} name={'paperclip'}/>
        <View style={styles.split}></View>
        <Text style={styles.locationText}>{amenities.join(', ')}</Text>
      </>
    )
  }

  const displaySaved = () => {
    return(
      <ScrollView style={styles.scroll}>
        {
          savedSearch.map((search) => {
            let propertyTypes = []
            search.search.isSingleFamily ? propertyTypes.push('Single Family Homes') : null
            search.search.isMultiFamily ? propertyTypes.push('Multi-Family Homes') : null
            search.search.isManufactured ? propertyTypes.push('Manufactured Homes') : null
            search.search.isTownhouse ? propertyTypes.push('Townhouses') : null
            search.search.isCondo ? propertyTypes.push('Condos') : null 
            search.search.isApartment ? propertyTypes.push('Apartments') : null
            let amenities = []
            search.search.hasAirConditioning ? amenities.push('AC Unit') : null 
            search.search.hasGarage ? amenities.push('Garage') : null 
            search.search.hasPool ? amenities.push('Pool') : null 
            search.search.isCityView ? amenities.push('City View') : null 
            search.search.isWaterView ? amenities.push('Water View') : null 
            search.search.isWaterfront ? amenities.push('Water View') : null 
            return(
              <View key={search.referenceNumber} style={styles.itemContainer}>
                <View style={styles.location}>
                  <Feather style={styles.icon} size={24} name={'map-pin'}/>
                  <View style={styles.split}></View>
                  <Text style={styles.locationText}>{search.search.location}</Text>
                  <View style={styles.split}></View>
                  <Text style={styles.locationText}>{search.search.status}</Text>
                </View>
                <View style={styles.location}>
                  {
                    propertyTypes.length > 0 ? displayPropertyTypes(propertyTypes) : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    search.search.beds_min ? displayBeds(search) : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    search.search.baths_min ? displayBaths(search) : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    search.search.price_min && search.search.price_min ? displayPrice(search) 
                      : search.search.price_min ? displayPriceMin(search) 
                          : search.search.price_max ? displayPriceMax(search) 
                              : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    search.search.sqft_min && search.search.sqft_max ? displaySqft(search) 
                    : search.search.sqft_min ? displaySqftMin(search) 
                        : search.search.sqft_max ? displaySqftMax(search) 
                            : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    search.search.hoa_max ? displayMaxHOA(search) : null
                  }
                </View>
                <View style={styles.location}>
                  {
                    amenities.length > 0 ? displayAmenities(amenities) : null
                  }
                </View>
                <View>
                  <TouchableOpacity onPress={() => {removeFromFavorites(search)}} style={styles.removeContainer}>
                    <Feather style={{marginRight: 8}} color={'white'} size={20} name={'x-circle'} />
                    <Text style={styles.removeText}>Remove Saves Search</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Saved Search</Text>
      </View>
      <TouchableOpacity style={styles.backContainer} onPress={() => {navigation.goBack()}}>
        <Text style={styles.subHeader}>Back</Text>
      </TouchableOpacity>
      {
        loading 
          ? showLoading()
          : savedSearch.length === 0 
            ? displayNone() 
              : displaySaved()
      }
      <View>
        <TouchableOpacity style={[styles.closeContainer]} onPress={() => {goToNewFeed()}}>
          <Text style={styles.close}>Add Feed Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    width: '100%'
  },
  scroll: {
    height: deviceHeight - 250
  },
  itemContainer: {
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    padding: 8
  },
  location: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    paddingVertical: 8,
    paddingLeft: 4
  },
  split: {
    width: 2,
    height: 18,
    backgroundColor: 'grey',
    marginHorizontal: 8
  },
  locationText: {
    fontSize: 18, 
    fontWeight: '500'
  },
  removeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: 'red'
  },
  removeText: {
    fontSize: 18,
    paddingVertical: 8,
    color: 'white'
  },
  closeContainer: {
    width: aspectWidth,
    marginLeft: 8,
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
  header: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 18,
    color: 'blue'
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
  backContainer: {
    position: 'absolute',
    left: 8,
    top: 8
  }
})

export default SavedSearchScreen