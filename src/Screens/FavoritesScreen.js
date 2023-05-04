import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { auth } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'

const FavoritesScreen = () => {
  const navigation = useNavigation()

  const {loggedIn, setLoggedIn} = useContext(ProfileContext)

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

  return (
    <View>
      <View>
        <Text>
          Favorites
        </Text>
      </View>
      {
        loggedIn ? null : displayAccountSetup()
      }
    </View>
  )
}

export default FavoritesScreen