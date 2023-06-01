import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { ProfileContext } from '../../Context/ProfileContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Api/firebaseTesting';
import { Text, View, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = deviceheight - 150

const SignupScreen = () => {
  const navigation = useNavigation()

  const {email, setEmail} = useContext(ProfileContext)
  const {password, setPassword} = useContext(ProfileContext)
  const {verify, setVerify} = useContext(ProfileContext)
  const {phone, setPhone} = useContext(ProfileContext)
  const {location, setLocation} = useContext(ProfileContext)
  const {lastName, setLastName} = useContext(ProfileContext)
  const {firstName, setFirstName} = useContext(ProfileContext)
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
    password === verify
      ? createAccount()
      : alert('Password / Verify don\'t match')
  }

  const createAccount = () => {
    const colRef = collection(db, 'Profiles')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail('')
        setPassword('')
        setVerify('')
        setPhone('')
        addDoc(colRef, {
          user_id: userCredential.user.uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          displayName: firstName + ' ' + lastName,
          phone: phone,
          location: location,
          createdAt: serverTimestamp()
        }).then((response) => {
          goToProfile()
        }).catch((error) => {
          console.error(error)
        })
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  const goToProfile = () => {
    navigation.navigate('ProfileScreen')
  }

  const goToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.screen}>
      <View>
        <Image style={styles.logo} source={require('../../Assets/RIPPE_FULL_LOGO_Blue.png')}/>
      </View>
      <View style={styles.form}> 
        <Text>Create Account</Text>
        <Text>* Fill in fields below *</Text>
      </View>
      <View style={styles.row}>
        <View>
          <Feather style={styles.icon} size={24} name={'user'} />
        </View>
        <View style={styles.splitter}></View>
        <View style={styles.userInfo}>
          <View style={styles.splitInfoContainer}>
            <TextInput 
              style={styles.splitInpupt}
              placeholder='First Name'
              value={firstName}
              onChangeText={(value) => {setFirstName(value)}}
            />
            <TextInput 
              style={styles.splitInpupt}
              placeholder='Last Name'
              value={lastName}
              onChangeText={(value) => {setLastName(value)}}
            />
          </View>
        </View>
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
            placeholder='Password'
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {setPassword(value)}}
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
            placeholder='Verify'
            secureTextEntry={true}
            value={verify}
            onChangeText={(value) => {setVerify(value)}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Feather style={styles.icon} size={24} name={'phone'} />
        </View>
        <View style={styles.splitter}></View>
        <View style={styles.userInfo}>
          <TextInput 
            style={styles.input}
            placeholder='Phone'
            value={phone}
            onChangeText={(value) => {setPhone(value)}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Feather style={styles.icon} size={24} name={'map-pin'} />
        </View>
        <View style={styles.splitter}></View>
        <View style={styles.userInfo}>
          <TextInput 
            style={styles.input}
            placeholder='City, State'
            value={location}
            onChangeText={(value) => {setLocation(value)}}
          />
        </View>
      </View>
      <TouchableOpacity style={[styles.closeContainer]} onPress={() => {createUserAccount()}}>
        <Text style={styles.close}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.create}>
        <Text>Already Have An Acount:</Text>
        <TouchableOpacity onPress={() => {goToLogin()}}>
          <Text style={styles.text}>Login</Text>
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
    backgroundColor: '#4132e1'
  },
  form: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  create: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  text: {
    color: '#4132e1',
    marginLeft: 4
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  splitInfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  splitInpupt: {
    width: '48%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  }
})

export default SignupScreen