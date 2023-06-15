import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../Api/firebaseTesting'
import { updateEmail, deleteUser, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const SettingsScreen = () => {
  const navigation = useNavigation()

  const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [deletedEmail, setDeletedEmail] = useState('')
  const [resetEmail, setResetEmail] = useState('')

  const [deletingAccount, setDeletingAccount] = useState(false)
  const [resetingPassword, setResetingPassword] = useState(false)

  useEffect(() => {
    grabProfile()
  }, [])

  const grabProfile = () => {
    setLoading(true)
    const colRef = collection(db, 'Profiles')
    const q = query(colRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let currentUserProfile = []
      snapshot.docs.forEach((doc) => {
        currentUserProfile.push({ ...doc.data(), id: doc.id })
      })
      setProfile(currentUserProfile[0])
      setFirstName(currentUserProfile[0].firstName)
      setLastName(currentUserProfile[0].lastName)
      setLocation(currentUserProfile[0].location)
      setEmail(currentUserProfile[0].email)
      setPhone(currentUserProfile[0].phone)
      setLoading(false)
    })
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('ProfileScreen') 
      }).catch((error) => {
        console.log(error)
      });
  }

  const updateUserProfile = () => {
    auth.currentUser.email === email
      ? updateProfile()
      : updateUserEmail()
  }

  const updateUserEmail = () => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        updateuserProfile()
      }).catch((error) => {
        console.error(error)
      });
  }

  const updateuserProfile = () => {
    const docRef = doc(db, 'Profiles', profile.id)
    updateDoc(docRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone, 
      location: location,
      displayNane: firstName + ' ' + lastName
    })
    .then((response) => {
      Alert.alert('Updated', 'Profile has been updated', [
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
      console.error(error)
    })
  }

  const resetUserPasswordWithEmail = () => {
    auth.currentUser.email != resetEmail.toLowerCase()
      ? Alert.alert('Incorrect Email', 'Please enter correct email.')
      : resetCurrentUserEmail()
  }

  const resetCurrentUserEmail = () => {
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
        // ..
      });
  }

  const deleteUserAccount = () => {
    auth.currentUser.email != deletedEmail.toLowerCase()
      ? Alert.alert('Incorrect Email', 'Please enter correct email.')
      : deleteCurrentAccount()
  }

  const deleteCurrentAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        navigation.navigate('ProfileScreen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const showContent = () => {
    return(
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>First Name:</Text>
          </View>
          <View>
            <TextInput 
              style={styles.input}
              placeholder={profile.firstName}
              value={firstName}
              onChangeText={(value) => {setFirstName(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Last Name:</Text>
          </View>
          <View>
            <TextInput 
              style={styles.input}
              placeholder={profile.lastName}
              value={lastName}
              onChangeText={(value) => {setLastName(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Phone:</Text>
          </View>
          <View>
            <TextInput 
              style={styles.input}
              placeholder={profile.phone}
              value={phone}
              onChangeText={(value) => {setPhone(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Email:</Text>
          </View>
          <View>
            <TextInput 
              style={styles.input}
              placeholder={profile.email}
              value={email}
              onChangeText={(value) => {setEmail(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Location</Text>
          </View>
          <View>
            <TextInput 
              style={styles.input}
              placeholder={profile.location}
              value={location}
              onChangeText={(value) => {setLocation(value)}}
            />
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>Security</Text>
        </View>
        <TouchableOpacity onPress={() => {setResetingPassword(!resetingPassword)}} style={styles.row}>
          <Text style={styles.logout}>Reset Password</Text>
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
                <TouchableOpacity onPress={() => {resetUserPasswordWithEmail()}}>
                  <Text style={styles.close}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setResetingPassword(!resetingPassword)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>Account</Text>
        </View>
        <TouchableOpacity onPress={() => {setDeletingAccount(!deletingAccount)}} style={styles.row}>
          <Text style={styles.logout}>Delete Account</Text>
        </TouchableOpacity>
        <Modal
            visible={deletingAccount}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>Deleting You Account</Text>
                <Text style={styles.modalInfo}>By deleting your account, you are agreeing remove your account from our records. This will cause a loss in saved data and preferences associated with this account. If you accept, enter the email associate with your account below and submit.</Text>
                <TextInput 
                  style={styles.input}
                  value={deletedEmail}
                  placeholder='Email'
                  onChangeText={(value) => {setDeletedEmail(value)}}
                />
                <TouchableOpacity onPress={() => {deleteUserAccount()}}>
                  <Text style={styles.close}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setDeletingAccount(!deletingAccount)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => {logoutUser()}} style={styles.row}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
      </ScrollView>
    )
  }

  const showLoading = () => {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
          <Text style={styles.subHeader}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
        <TouchableOpacity onPress={() => {updateUserProfile()}}>
          <Text style={styles.subHeader}>Done</Text>
        </TouchableOpacity>
      </View>
      {
        !loading ? showContent() : showLoading()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 54,
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
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  backContainer: {
    position: 'absolute',
    left: 8,
    top: 8
  },
  sectionHeader: {
    height: 38,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey',
    paddingLeft: 8
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600'
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  text: {
    fontSize: 18, 
    fontWeight: '500'
  },
  logout: {
    fontSize: 17,
    color: 'red',
    fontWeight: '600'
  },
  input: {
    width: 200,
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  modalContainer: {
    width: aspectWidth,
    height: deviceHeight,
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
  close: {
    paddingTop: 10,
    paddingHorizontal: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
})


export default SettingsScreen