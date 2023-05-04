import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { ProfileContext } from '../../Context/ProfileContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Api/firebaseTesting';
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

const SignupScreen = () => {
  const navigation = useNavigation()

  const {email, setEmail} = useContext(ProfileContext)
  const {password, setPassword} = useContext(ProfileContext)
  const {verify, setVerify} = useContext(ProfileContext)
  const {username, setUsername} = useContext(ProfileContext)
  const {phone, setPhone} = useContext(ProfileContext)
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

  const createUserAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail('')
        setPassword('')
        setVerify('')
        setUsername('')
        setPhone('')
        goToFavorites()
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  const goToFavorites = () => {
    navigation.navigate('FavoritesScreen')
  }

  const goToLogin = () => {
    navigation.navigate('LoginFavoritesScreen')
  }

  return (
    <View>
      <View>
        <Text>Create Account</Text>
      </View>
      <View>
        <Text>Username</Text>
        <TextInput 
          placeholder='username'
          value={username}
          onChangeText={(value) => {setUsername(value)}}
        />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput 
          placeholder='email'
          value={email}
          onChangeText={(value) => {setEmail(value)}}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput 
          secureTextEntry={true}
          placeholder='password'
          value={password}
          onChangeText={(value) => {setPassword(value)}}
        />
      </View>
      <View>
        <Text>Verify Password</Text>
        <TextInput 
          secureTextEntry={true}
          placeholder='password'
          value={verify}
          onChangeText={(value) => {setVerify(value)}}
        />
      </View>
      <View>
        <Text>Phone</Text>
        <TextInput 
          placeholder='phone'
          keyboardType='phone-pad'
          value={phone}
          onChangeText={(value) => {setPhone(value)}}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => {createUserAccount()}}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {goToLogin()}}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupScreen