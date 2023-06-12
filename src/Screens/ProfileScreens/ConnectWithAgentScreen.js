import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { db, auth } from '../../Api/firebaseTesting'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const ConnectWithAgentScreen = () => {
  const [property, setProperty] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [price, setPrice] = useState('')
  const [mlsId, setMlsId] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    // setPrice(currentHome.price)
    // setMlsId(currentHome.mlsid)
    // setAddress(currentHome.address.streetAddress 
    //             + ', ' + currentHome.address.city
    //             + ', ' + currentHome.address.state
    //             + ' ' + currentHome.address.zipcode)
  }, [])

  const submitRequest = () => {
    const collectionRef = collection(db, 'GeneralConnect')
    addDoc(collectionRef, {
      "firstName": firstName,
      "lastName": lastName,
      "email":email,
      "phone":phone,
      "message":message,
      "createdAd":serverTimestamp()
    }).then((response) => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setMessage('')
      alert('Your message has been sent!')
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <View style={styles.scroll}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Connect With An Agent</Text>
      </View>
      <View style={styles.agentContainer}>
        <View style={styles.imageContainer}>
          <Image style={{height: 100, width: 100}} source={{uri: 'https://dummyimage.com/100X100/000/fff'}}/>
        </View>
        <View style={styles.agentInfoContainer}>
          <View>
            <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>Omar Jandali</Text> | DRE# 02151051</Text>
          </View>
          <View>
            <Text style={styles.text}>Realy One Group</Text>
          </View>
          <View>
            <Text style={styles.text}>951-534-3666</Text>
          </View>
          <View>
            <Text style={styles.text}>omarjandali93@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.message}>Interested in this property or ask a question. Connect with an agent by filling out the form below.</Text>
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.nameAndInputShort}>
          <Text>First Name</Text>
          <TextInput 
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.nameAndInputShort}>
          <Text>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <View style={styles.nameAndInput}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.nameAndInput}>
        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.nameAndInput}>
        <Text>Message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.submitContainer} onPress={() => {submitRequest()}}>
        <View>
          <Text style={styles.submit}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 58
  },
  header: {
    fontSize: 24,
    fontWeight: '600'
  }, 
  subHeader: {
    fontSize: 18,
    color: 'blue'
  },
  headerContainer: {
    width: aspectWidth,
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  agentContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 8,
    borderRadius: 5,
    overflow: 'hidden'
  },
  agentInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  agentName: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  brokerName: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  agentContact: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    marginRight: 4
  },
  mainText: {
    fontWeight: '600'
  },
  disclaimer: {
    width: '96%',
    marginLeft: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400'
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginLeft: '2%',
    marginTop: 16
  },
  nameAndInputShort: {
    display: 'flex',
    width: '45%',
  },
  input: {
    width: '100%',
    backgroundColor: 'lightgrey',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 8
  },
  nameAndInput: {
    width: '96%',
    marginLeft: '2%',
    marginTop: 8
  },
  submitContainer: {
    width: '96%',
    marginLeft: '2%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  submit: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 17,
    fontWeight: '600',
    backgroundColor: '#1560bd',
    color: 'white',
    borderRadius: 5,
    overflow: 'hidden'
  }
})

export default ConnectWithAgentScreen