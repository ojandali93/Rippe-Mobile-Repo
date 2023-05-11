import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native'
import { auth, db } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'
import { PropertiesContext } from '../Context/PropertiesContext'
import { doc, deleteDoc } from 'firebase/firestore';


const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const FavoritesScreen = () => {
  const navigation = useNavigation()

  const {loggedIn, setLoggedIn} = useContext(ProfileContext)
  const {favoritesZpids, favorites} = useContext(PropertiesContext)

  useEffect(() => {
    auth.currentUser === null 
      ? setLoggedIn(false)
      : setLoggedIn(true)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? setLoggedIn(false)
        : setLoggedIn(true)
    })
    return unsubscribe
  }, [navigation])

  const signinUser = () => {
    navigation.navigate('LoginFavoritesScreen')
  }

  const signupUser = () => {
    navigation.navigate('SignupFavoritesScreen')
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

  const displayAccountSetup = () => {
    return(
      <View>
        <View>
          <Text>You are currently not logged in!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => {signinUser()}}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {signupUser()}}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const displayProperties = () => {
    return(
      <ScrollView>
        {
          favorites.map((property) => {
            return(
              <View key={property.property.zpid}>
                <TouchableOpacity onPress={() => {}}> 
                  <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.property.imgSrc}}/>
                  <View>
                    <View>
                      {
                        favoritesZpids.includes(property.property.zpid)
                          ? <TouchableOpacity onPress={() => {removeFromFavorites(property)}}><Text>Included</Text></TouchableOpacity>
                          : null
                      }
                    </View>
                    <View>
                      <Text>{property.property.price}</Text>
                      <Text>{property.property.homeStatus}</Text>
                    </View>
                    <View>
                      <Text>
                        {property.property.streetAddress}
                      </Text>
                      <Text>
                        {property.property.city}, {property.property.state} {property.property.zipcode}
                      </Text>
                    </View>
                    <View>
                      <Text>
                        {property.property.bedrooms} Beds | {property.property.bathrooms} Bath | {property.property.livingArea} Sqft.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text>Monthly Expenses: {property.property.investment.expenses}</Text>
                    </View>
                    <View>
                      <Text>Monthly Revenue: {property.property.investment.monthlyRevenue}</Text>
                    </View>
                    <View>
                      <Text>Net Operating Income: {property.property.investment.netOperatingIncome}</Text>
                    </View>
                    <View>
                      <Text>Cash Flow: {property.property.investment.monthlyCashFLow}</Text>
                    </View>
                    <View>
                      <Text>Cash on Cash Return: {property.property.investment.currentCashOnCashReturn}</Text>
                    </View>
                    <View>
                      <Text>Cap Rate: {property.property.investment.currentCapRate}</Text>
                    </View>
                    <View>
                      <Text>Year 1 ROI: {property.property.investment.year1ReturnOnInvestment}</Text>
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
        <Text>
          Favorites
        </Text>
      </View>
      {
        loggedIn ? displayProperties() : displayAccountSetup()
      }
    </View>
  )
}

export default FavoritesScreen