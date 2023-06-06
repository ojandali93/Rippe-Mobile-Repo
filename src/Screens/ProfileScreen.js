import React, {useEffect, useContext} from 'react'
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { signOut } from "firebase/auth";
import { Feather, SimpleLineIcons, Fontisto } from 'react-native-vector-icons'

import { auth } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../Context/ProfileContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

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

  const goToRecentView = () => {
    navigation.navigate('RecentViewScreen')
  }

  const displayLogout = () => {
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            {
              auth.currentUser == null ? null :  <Text style={styles.headerText}>{auth.currentUser.email}</Text>
            }
            <TouchableOpacity>
              <Feather name='settings' size={28} color={'black'}/>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>General</Text>
          </View>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='eye'/>
              <Text style={styles.text}>Recent Views</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='bookmark'/>
              <Text style={styles.text}>Saved Search</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Home</Text>
          </View>

          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <SimpleLineIcons style={styles.chevronDown} size={20} color={'black'} name='calculator'/>
              <Text style={styles.text}>Payment Calculator</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Fontisto style={styles.chevronDown} size={20} color={'black'} name='money-symbol'/>
              <Text style={styles.text}>How Much Can I Affort</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='calendar'/>
              <Text style={styles.text}>Current Offers</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='tag'/>
              <Text style={styles.text}>Sell My Home</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='link'/>
              <Text style={styles.text}>Connect W/ An Agent</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Support</Text>
          </View>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='message-square'/>
              <Text style={styles.text}>Contact Us</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='help-circle'/>
              <Text style={styles.text}>FAQ's</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='clipboard'/>
              <Text style={styles.text}>Careers</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Legal</Text>
          </View>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='file-text'/>
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='file-text'/>
              <Text style={styles.text}>Terms Of Service</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='file-text'/>
              <Text style={styles.text}>Open Source Licenses</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToRecentView()}} style={styles.row}>
            <View style={styles.subRow}>
              <Feather style={styles.chevronDown} size={20} color={'black'} name='smartphone'/>
              <Text style={styles.text}>About Rippe</Text>
            </View>
            <Feather style={styles.chevronRight} size={20} name={'chevron-right'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {logoutUser()}} style={styles.row}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.versionRow}>
            <Text>Version 1.0.1 | Release: June 30, 2023</Text>
          </View>
        </ScrollView>
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
    marginTop: 58
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
  },
  sectionHeader: {
    width: '100%',
    paddingLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  subRow: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
  chevronDown: {
    color: '#1c39bb',
    marginHorizontal: 16
  },
  logout: {
    fontSize: 17,
    marginLeft: 16,
    color: 'red',
    paddingVertical: 12
  },
  versionRow: {
    widht: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  },
  chevronRight: {
    paddingRight: 8
  }
})

export default ProfileScreen