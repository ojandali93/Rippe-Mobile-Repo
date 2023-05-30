import React, {useEffect, useContext} from 'react'
import {View, Text, ViewBase, Modal, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { signOut } from "firebase/auth";

import { auth } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'

const ProfileScreen = () => {
  const navigation = useNavigation()

  const {setPassword, setEmail} = useContext(ProfileContext)
  const {loggedIn, setLoggedIn} = useContext(ProfileContext)

  useEffect(() => {
    auth.currentUser === null 
      ? setLoggedIn(false)
      : setLoggedIn(true)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? navigation.navigate('LoginScreen')
        : setLoggedIn(true)
    })
    return unsubscribe
  }, [navigation])

  const signinUser = () => {
    navigation.navigate('LoginScreen')
  }

  const signupUser = () => {
    navigation.navigate('SignupScreen')
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setPassword('')
        setEmail('')
        navigation.navigate('LoginScreen') 
      }).catch((error) => {
        console.log(error)
      });
  }

  const displayLogout = () => {
    return(
      <TouchableOpacity onPress={() => {logoutUser()}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    )
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
    <View style={styles.screen}>
      {
        loggedIn ? displayLogout() : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    paddingLeft: 8
  }
})

export default ProfileScreen