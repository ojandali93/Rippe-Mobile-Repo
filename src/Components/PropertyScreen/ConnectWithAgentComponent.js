import React, { useState } from 'react'
import { Text, TextInput, View, Switch } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'


const ConnectWithAgentComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [levelOfInterest, setLevelOfInterest] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [viewed, setViewed] = useState('')
  const [schedule, setSchedule] = useState('')

  return (
    <View>
      <View>
        <Text>Connect With An Agent</Text>
      </View>
      <View>
        <Text>First Name</Text>
        <TextInput
          placeholder='First Name'
          inputMode='text'
          value={firstName}
          onChangeText={(value) => {setFirstName(value)}}
        />
      </View>
      <View>
        <Text>Last Name</Text>
        <TextInput
          placeholder='Last Name'
          inputMode='text'
          value={lastName}
          onChangeText={(value) => {setLastName(value)}}
        />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          placeholder='example@mail.com'
          inputMode='email'
          value={email}
          onChangeText={(value) => {setEmail(value)}}
        />
      </View>
      <View>
        <Text>Phone</Text>
        <TextInput
          placeholder='999-999-9999'
          inputMode='tel'
          value={phone}
          onChangeText={(value) => {setPhone(value)}}
        />
      </View>
      <View>
        <Text>Message</Text>
        <TextInput
          placeholder='Leave a message...'
          value={message}
          onChangeText={(value) => {setMessage(value)}}
          multiline={true}
        />
      </View>
      <View>
        <Text>Level of interest</Text>
        <RNPickerSelect 
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
      <View>
        <Text>Reason of purchase</Text>
        <RNPickerSelect 
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
      <View>
        <Text>Viewed the property</Text>
        <Switch
          value={viewed}
          onValueChange={() => {setViewed(!viewed)}}
        />
      </View>
      <View>
        <Text>Schedule a tour</Text>
        <Switch
          value={schedule}
          onValueChange={() => {setSchedule(!schedule)}}
        />
      </View>
    </View>
  )
}

export default ConnectWithAgentComponent