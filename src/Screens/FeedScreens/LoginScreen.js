import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../Context/ProfileContext'
import { Text, View, Dimensions, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Feather } from 'react-native-vector-icons'

import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../Api/firebaseTesting';

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = deviceheight - 150

const LoginScreen = () => {
  const navigation = useNavigation()

  const {email, setEmail} = useContext(ProfileContext)
  const {password, setPassword} = useContext(ProfileContext)
  const {setLoggedIn} = useContext(ProfileContext)

  const [resetEmail, setResetEmail] = useState('')
  const [resetingPassword, setResetingPassword] = useState(false)

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
        alert('Email / Password \n don\'t match our records')
      })
  }
  
  const goToProfile = () => {
    navigation.navigate('ProfileScreen')
  }

  const goToSignup = () => {
    navigation.navigate('SignupScreen')
  }

  const resetCurrentUserEmail = () => {
    console.log('hello')
    sendPasswordResetEmail(auth, resetEmail.toLowerCase())
      .then(() => {
        Alert.alert('Reset Password', 'Reset password email was sent.', [
          {
            text: 'Close',
            onPress: () => {navigation.navigate('ProfileScreen')}
          },
          {
            text: 'Okay',
            onPress: () => {navigation.navigate('ProfileScreen')}
          }
        ])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <View style={styles.screen}>
      <View>
        <Image style={styles.logo} source={require('../../Assets/RIPPE_FULL_LOGO_Blue.png')}/>
      </View>
      <View style={styles.row}>
        <View>
          <Feather style={styles.icon} size={24} name={'mail'} />
        </View>
        <View style={styles.splitter}></View>
        <View style={styles.userInfo}>
          <TextInput 
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={(value) => {setEmail(value)}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Feather style={styles.icon} size={24} name={'lock'} />
        </View>
        <View style={styles.splitter}></View>
        <View style={styles.userInfo}>
          <TextInput 
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            value={password}
            onChangeText={(value) => {setPassword(value)}}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => {setResetingPassword(!resetingPassword)}} style={styles.row}>
          <Text style={styles.logout}>Forgot Password?</Text>
        </TouchableOpacity>
        <Modal
            visible={resetingPassword}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>Reset Password</Text>
                <Text style={styles.modalInfo}>Enter the email associated with this account to recieve an email with instructions to reset your password.</Text>
                <TextInput 
                  style={styles.input}
                  value={resetEmail}
                  placeholder='Email'
                  onChangeText={(value) => {setResetEmail(value)}}
                />
                <TouchableOpacity onPress={() => {resetCurrentUserEmail()}}>
                  <Text style={styles.closeButton}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setResetingPassword(!resetingPassword)}}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      <TouchableOpacity style={[styles.closeContainer]} onPress={() => {loginUser()}}>
        <Text style={styles.close}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.create}>
        <Text>Create A New Account:</Text>
        <TouchableOpacity onPress={() => {goToSignup()}}>
          <Text style={styles.text}>Click Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    width: aspectWidth,
    height: aspectHeight,
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 70,
    width: 248,
    marginBottom: 16
  },
  row: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  icon: {
    paddingRight: 8,
    paddingVertical: 8
  },
  splitter: {
    width: 2,
    height: 30,
    backgroundColor: '#0039a6'
  },
  userInfo: {
    marginLeft: 8,
    width: '80%'
  },
  label: {
    fontSize: 12
  },
  input: {
    width: '100%',
    fontSize: 18,
    paddingTop: 4,
    paddingLeft: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  forgot: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4
  },
  closeContainer: {
    width: '60%',
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
  create: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  text: {
    color: '#0039a6',
    marginLeft: 4
  },
  modalContainer: {
    width: aspectWidth,
    height: deviceheight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCOntent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalInfo: {
    textAlign: 'justify',
    marginBottom: 16
  },
  closeButton: {
    paddingTop: 10,
    paddingHorizontal: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
})

export default LoginScreen