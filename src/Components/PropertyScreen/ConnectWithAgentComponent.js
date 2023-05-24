import React, { useState } from 'react'
import { Text, TextInput, View, Switch, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const ConnectWithAgentComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [levelOfInterest, setLevelOfInterest] = useState('Just looking')
  const [reason, setReason] = useState('First investment property')
  const [message, setMessage] = useState('')
  const [viewed, setViewed] = useState('')
  const [schedule, setSchedule] = useState('')

  return (
    <View style={styles.listingContainer}>
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
        <Text style={styles.text}>Level of interest</Text>
        <RNPickerSelect 
          style={styles.input}
          value={levelOfInterest}
          onValueChange={(value) => setLevelOfInterest(value)}
          items={[
            {
              'label': 'Just looking',
              'value': 'Just looking'
            },
            {
              'label': 'More info',
              'value': 'More info'
            },
            {
              'label': 'Fairly interested',
              'value': 'Fairly interested'
            },
            {
              'label': 'Very interested',
              'value': 'Very interested'
            },
            {
              'label': 'Ready to purchase',
              'value': 'Ready to purchase'
            },
          ]}
        />
      </View>
      <View style={styles.newRowSelect}>
        <Text style={styles.text}>Reason of purchase</Text>
        <RNPickerSelect 
          style={styles.input}
          value={reason}
          onValueChange={(value) => setReason(value)}
          items={[
            {
              'label': 'First investment property',
              'value': 'First investment property'
            },
            {
              'label': 'Expanding portfolio',
              'value': 'Expanding portfolio'
            },
            {
              'label': 'Interested in investing',
              'value': 'Interested in investing'
            },
            {
              'label': 'Invest in stable assets',
              'value': 'Invest in stable assets'
            },
            {
              'label': 'Purchase and flip',
              'value': 'Purchase and flip'
            },
          ]}
        />
      </View>
      <View style={styles.newRowSelect}>
        <Text style={styles.text}>Viewed the property</Text>
        <Switch
          value={viewed}
          onValueChange={() => {setViewed(!viewed)}}
        />
      </View>
      <View style={styles.newRowSelect}>
        <Text style={styles.text}>Schedule a tour</Text>
        <Switch
          value={schedule}
          onValueChange={() => {setSchedule(!schedule)}}
        />
      </View>
      <TouchableOpacity style={[styles.closeContainer]} onPress={() => {setAccessFilter(!accessFilter)}}>
        <Text style={styles.close}>Connect With Agent</Text>
      </TouchableOpacity>
    </View>
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
})

export default ConnectWithAgentComponent