import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { useNavigation } from '@react-navigation/native'
import { PropertyContext } from '../../Context/PropertyContext'

import { auth, db } from '../../Api/firebaseTesting'
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { ProfileContext } from '../../Context/ProfileContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const ResultsComponent = () => {
  const navigation = useNavigation()

  const {results} = useContext(PropertiesContext)
  const {favoritesZpids, favorites} = useContext(PropertiesContext)

  const {setProperty} = useContext(PropertyContext)

  const {loggedIn} = useContext(ProfileContext)

  const goToPropertyPage = (property) => {
    setProperty(property)
    navigation.navigate('PropertyScreen')
  }

  const addToFavorites = (property) => {
    loggedIn === false 
      ? null 
      : addFavorite(property)
  }

  const addFavorite = (property) => {
    console.log('about to add to favorites: ', auth.currentUser)
    auth.currentUser === null
      ? null 
      : console.log('add to favorites')
        const collectionRef = collection(db, 'Favorites')
        let favoriteProperty = {}
        favoriteProperty.bathrooms = property.bathrooms
        favoriteProperty.bedrooms = property.bedrooms
        favoriteProperty.city = property.city
        favoriteProperty.country = property.country
        favoriteProperty.datePriceChanged = property.datePriceChanged
        favoriteProperty.daysOnZillow = property.daysOnZillow
        favoriteProperty.homeStatus = property.homeStatus
        favoriteProperty.homeType = property.homeType
        favoriteProperty.imgSrc = property.hugePhotos[0].url
        favoriteProperty.investment = property.investment
        favoriteProperty.latitude = property.latitude
        favoriteProperty.livingArea = property.livingArea + ' ' + property.livingAreaUnitsShort
        favoriteProperty.longitude = property.longitude
        favoriteProperty.lotAreaUnit = property.lotAreaUnits
        favoriteProperty.lotAreaValue = property.lotAreaValue
        favoriteProperty.price = property.price
        favoriteProperty.priceChange = property.priceChange
        favoriteProperty.rentZestimate = property.rentZestimate
        favoriteProperty.state = property.state
        favoriteProperty.streetAddress = property.streetAddress
        favoriteProperty.zestimate = property.zestimate
        favoriteProperty.zipcode = property.zipcode
        favoriteProperty.zpid = property.zpid
        addDoc(collectionRef, {
          'property': favoriteProperty,
          'userId': auth.currentUser.uid,
          'zpid': property.zpid,
          'createdAt': serverTimestamp()
        })
        .then((response) => {
          console.log('successfully added')
        })
        .catch((error) => {
          console.error(error)
        })
  }

  const removeFromFavorites = (property) => {
    let selectedFavorite
    favorites.forEach((fav) => {
      fav.zpid === property.zpid
        ? selectedFavorite = fav 
        : null 
    })
    const docRef = doc(db, 'Favorites', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
        console.log('deleted favorite')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <ScrollView>
    {
      results.map((property) => {
        return(
          <View key={property.zpid}>
            <TouchableOpacity onPress={() => {goToPropertyPage(property)}}> 
              <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.hiResImageLink}}/>
              <View>
                <View>
                  {
                    favoritesZpids.includes(property.zpid)
                      ? <TouchableOpacity onPress={() => {removeFromFavorites(property)}}><Text>Included</Text></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {addToFavorites(property)}}><Text>Not Included</Text></TouchableOpacity>
                  }
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
              <View>
                <View>
                  <Text>Monthly Expenses: {property.investment.expenses}</Text>
                </View>
                <View>
                  <Text>Monthly Revenue: {property.investment.monthlyRevenue}</Text>
                </View>
                <View>
                  <Text>Net Operating Income: {property.investment.netOperatingIncome}</Text>
                </View>
                <View>
                  <Text>Cash Flow: {property.investment.monthlyCashFLow}</Text>
                </View>
                <View>
                  <Text>Cash on Cash Return: {property.investment.currentCashOnCashReturn}</Text>
                </View>
                <View>
                  <Text>Cap Rate: {property.investment.currentCapRate}</Text>
                </View>
                <View>
                  <Text>Year 1 ROI: {property.investment.year1ReturnOnInvestment}</Text>
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

export default ResultsComponent