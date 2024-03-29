import React, { useContext, useState } from 'react'
import { Text, TextInput, View, Switch, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { PropertyContext } from '../../Context/PropertyContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Api/firebaseTesting'

import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const ConnectWithAgentComponent = () => {
  const {property} = useContext(PropertyContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [levelOfInterest, setLevelOfInterest] = useState('Just looking')
  const [reason, setReason] = useState('First investment property')
  const [message, setMessage] = useState('')
  const [viewed, setViewed] = useState('')
  const [schedule, setSchedule] = useState('')

  const [accessInterest, setAccessInterest] = useState(false)
  const [accessReson, setAccessReason] = useState(false)

  const validateConnection = () => {
    firstName === ''
      ? alert('First Name Required')
      : lastName === ''
        ? alert('Last Name Required')
        : !validatePhoneNumber(phone) 
          ? alert('Invalid Phone Number')
          : !validateEmail(email)
            ? alert('Invalid Email')
            : submitRequest()
  }

  function validatePhoneNumber(string) {
    const digitsOnly = string.replace(/\D/g, '');
    return digitsOnly.length === 10
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const submitRequest = () => {
    const address = property.abbreviatedAddress + ' ' + property.city + ', ' + property.state + ' ' + property.zipcode;
    const to = 'support@rippeapp.com';
    const from = email // Email addresses of recipients
    const subject = 'Rippe App Connect - ' + firstName + ' ' + lastName + ' - ' + address
    const body = 'This is a property inquiry from ' + address + '. \n' + firstName + ' ' + lastName + ' is sending the following' + 
                  ' message regarding the property: \n\n' + message + '\n\n Other details: \n Current level of interest: ' + 
                  levelOfInterest + '. \m Main reason for purchase: ' + reason + '\n Viewed the property: ' + viewed +
                  '\n Would like to schedule a tour: ' + schedule + '\n\n Contact Details: \n' + firstName + ' ' + lastName + 
                  '\nPhone:' + 'phone \n Email: ' + email + '\n\n This email was automatically generated by Rippe. \n\n\n ' + 
                  'Rippe Inc. \nsupport@rippeapp.com \n (949) 403-7179 \n Los Angeles, CA' 

    const colRef = collection(db, 'ConnectWithAgent')
    addDoc(colRef, {
      to: to,
      from: from,
      subject: subject,
      body: body,
      firstName: firstName,
      lastName: lastName,
      address: address,
      created: serverTimestamp()
    })
    .then(() => {
      setEmail('')
      setFirstName('')
      setLastName('')
      setPhone('')
      setMessage('')
      setSchedule(false)
      setViewed(false)
      alert('Your Message Was Sent')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const displayPhone = () => {
    return(
      <View style={styles.listingContainer}>
        <View style={styles.agentContainer}>
          <View style={styles.imageContainer}>
            <Image style={{height: 100, width: 100}} source={require('../../Assets/real-estate-agent.png')}/>
          </View>
          <View style={styles.agentInfoContainer}>
            <View>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>Omar Jandali</Text>
            </View>
            <View>
              <Text style={styles.text}>DRE# 02151051</Text>
            </View>
            <View>
              <Text style={styles.text}>Realy One Group</Text>
            </View>
          </View>
        </View>
        <View style={styles.newRow}>
          <View style={styles.column}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder='First Name'
              inputMode='text'
              value={firstName}
              onChangeText={(value) => {setFirstName(value)}}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Last Name'
              inputMode='text'
              value={lastName}
              onChangeText={(value) => {setLastName(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='example@mail.com'
            inputMode='email'
            value={email}
            onChangeText={(value) => {setEmail(value)}}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Phone</Text>
          <TextInput 
            style={styles.input}
            placeholder='999-999-9999'
            inputMode='tel'
            value={phone}
            onChangeText={(value) => {setPhone(value)}}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Message</Text>
          <TextInput
            style={styles.input}
            placeholder='Leave a message...'
            value={message}
            onChangeText={(value) => {setMessage(value)}}
            multiline={true}
          />
        </View>
        <View style={styles.newRowSelect}>
          <TouchableOpacity onPress={() => {setAccessInterest(!accessInterest)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Level Of Interest: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{levelOfInterest}</Text>
              {
                accessInterest
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessInterest
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={levelOfInterest}
                  onValueChange={(value) => setLevelOfInterest(value)}
                >
                  <Picker.Item label='Just looking' value='Just looking' />
                  <Picker.Item label='More info' value='More info' />
                  <Picker.Item label='Fairly interested' value='Fairly interested' />
                  <Picker.Item label='Very interested' value='Very interested' />
                  <Picker.Item label='Ready to purchase' value='Ready to purchase' />
                </Picker>
          }
        </View>
        <View style={styles.newRowSelect}>
          <TouchableOpacity onPress={() => {setAccessReason(!accessReson)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Reason: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{reason}</Text>
              {
                accessReson
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessReson
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={reason}
                  onValueChange={(value) => setReason(value)}
                >
                  <Picker.Item label='First investment property' value='First investment property' />
                  <Picker.Item label='Expanding portfolio' value='Expanding portfolio' />
                  <Picker.Item label='Interested in investing' value='Interested in investing' />
                  <Picker.Item label='Invest in stable assets' value='Invest in stable assets' />
                  <Picker.Item label='Purchase and flip' value='Purchase and flip' />
                </Picker>
          }
        </View>
        <View style={styles.newRowSelectNew}>
          <Text style={styles.text}>Viewed the property</Text>
          <Switch
            value={viewed}
            onValueChange={() => {setViewed(!viewed)}}
          />
        </View>
        <View style={styles.newRowSelectNew}>
          <Text style={styles.text}>Schedule a tour</Text>
          <Switch
            value={schedule}
            onValueChange={() => {setSchedule(!schedule)}}
          />
        </View>
        <TouchableOpacity style={[styles.closeContainer]} onPress={() => {validateConnection()}}>
          <Text style={styles.close}>Connect With Agent</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.listingContainerTablet}>
        <View style={styles.agentContainer}>
          <View style={styles.imageContainer}>
            <Image style={{height: 100, width: 100}} source={require('../../Assets/real-estate-agent.png')}/>
          </View>
          <View style={styles.agentInfoContainer}>
            <View>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>Omar Jandali</Text>
            </View>
            <View>
              <Text style={styles.text}>DRE# 02151051</Text>
            </View>
            <View>
              <Text style={styles.text}>Realy One Group</Text>
            </View>
          </View>
        </View>
        <View style={styles.newRow}>
          <View style={styles.column}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder='First Name'
              inputMode='text'
              value={firstName}
              onChangeText={(value) => {setFirstName(value)}}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Last Name'
              inputMode='text'
              value={lastName}
              onChangeText={(value) => {setLastName(value)}}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='example@mail.com'
            inputMode='email'
            value={email}
            onChangeText={(value) => {setEmail(value)}}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Phone</Text>
          <TextInput 
            style={styles.input}
            placeholder='999-999-9999'
            inputMode='tel'
            value={phone}
            onChangeText={(value) => {setPhone(value)}}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Message</Text>
          <TextInput
            style={styles.input}
            placeholder='Leave a message...'
            value={message}
            onChangeText={(value) => {setMessage(value)}}
            multiline={true}
          />
        </View>
        <View style={styles.newRowSelect}>
          <TouchableOpacity onPress={() => {setAccessInterest(!accessInterest)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Level Of Interest: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{levelOfInterest}</Text>
              {
                accessInterest
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessInterest
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={levelOfInterest}
                  onValueChange={(value) => setLevelOfInterest(value)}
                >
                  <Picker.Item label='Just looking' value='Just looking' />
                  <Picker.Item label='More info' value='More info' />
                  <Picker.Item label='Fairly interested' value='Fairly interested' />
                  <Picker.Item label='Very interested' value='Very interested' />
                  <Picker.Item label='Ready to purchase' value='Ready to purchase' />
                </Picker>
          }
        </View>
        <View style={styles.newRowSelect}>
          <TouchableOpacity onPress={() => {setAccessReason(!accessReson)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Reason: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{reason}</Text>
              {
                accessReson
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessReson
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={reason}
                  onValueChange={(value) => setReason(value)}
                >
                  <Picker.Item label='First investment property' value='First investment property' />
                  <Picker.Item label='Expanding portfolio' value='Expanding portfolio' />
                  <Picker.Item label='Interested in investing' value='Interested in investing' />
                  <Picker.Item label='Invest in stable assets' value='Invest in stable assets' />
                  <Picker.Item label='Purchase and flip' value='Purchase and flip' />
                </Picker>
          }
        </View>
        <View style={styles.newRowSelectNew}>
          <Text style={styles.text}>Viewed the property</Text>
          <Switch
            value={viewed}
            onValueChange={() => {setViewed(!viewed)}}
          />
        </View>
        <View style={styles.newRowSelectNew}>
          <Text style={styles.text}>Schedule a tour</Text>
          <Switch
            value={schedule}
            onValueChange={() => {setSchedule(!schedule)}}
          />
        </View>
        <TouchableOpacity style={[styles.closeContainer]} onPress={() => {validateConnection()}}>
          <Text style={styles.close}>Connect With Agent</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
  )
}

const styles = StyleSheet.create({
  listingContainer: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  listingContainerTablet: {
    width: aspectWidthTablet,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  agentContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems:'center'
  },
  agentInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 16
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  expensesText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8
  },
  text: {
    fontSize: 18
  },
  newRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  newRowSelect: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center'
  },
  newRowSelectNew: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center'
  },
  column: {
    width: '48%',
    paddingVertical: 4
  },
  row: {
    paddingVertical: 4
  },
  input: {
    width: '100%',
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    backgroundColor: 'lightgrey',
    marginTop: 4
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  },
  close: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8
  },
  pickerLabel: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerLabelSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailSection: {
    fontSize: 18,
    fontWeight: '500'
  },
  itemContainerStatus: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 8
  }
})

export default ConnectWithAgentComponent