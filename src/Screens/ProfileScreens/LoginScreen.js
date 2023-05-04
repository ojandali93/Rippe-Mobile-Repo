import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../Context/ProfileContext'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Api/firebaseTesting';

const LoginScreen = () => {
  const navigation = useNavigation()

  const {email, setEmail} = useContext(ProfileContext)
  const {password, setPassword} = useContext(ProfileContext)
  const {setLoggedIn} = useContext(ProfileContext)

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

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setEmail('')
        setPassword('')
        goToProfile()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  const goToProfile = () => {
    navigation.navigate('ProfileScreen')
  }

  const goToSignup = () => {
    navigation.navigate('SignupScreen')
  }

  return (
    <View>
        <View>
          <View>
            <Text>Login Below</Text>
          </View>
          <View>
            <Text>Username</Text>
            <TextInput 
              placeholder='Username'
              value={email}
              onChangeText={(value) => {setEmail(value)}}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput 
              secureTextEntry={true}
              placeholder='Password'
              value={password}
              onChangeText={(value) => {setPassword(value)}}
            />
          </View>
          <TouchableOpacity onPress={() => {loginUser()}}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToSignup()}}>
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default LoginScreen