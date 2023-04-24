import React, { useContext, useState } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'

const ScheduleTourComponent = () => {

  const {property} = useContext(PropertyContext)
  
  const [modal, setModal] = useState(false)
  const [date, setDate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState('')

  return (
    <View>
      <TouchableOpacity onPress={() => {setModal(!modal)}}>
        <Text>
          Schedule A Tour
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modal}
        onRequestClose={() => {
          setModal(!modal)
        }}
      >
        <View>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <View>
            <Text>
              Earliest Availability For Showing:
            </Text>
            <TouchableOpacity onPress={() => {setOpen(true)}}>
              <Text>Select Date</Text>
            </TouchableOpacity>
            <DatePicker
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2023-01-01"
              maxDate="2040-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {setDate(date)}}
            />
          </View>
          <View>
            <Text>
              First Name:
            </Text>
            <TextInput
              placeholder='First Name'
              value={firstName}
              onChangeText={(value) => {setFirstName(value)}}
            />
          </View>
          <View>
            <Text>
              Last Name:
            </Text>
            <TextInput
              placeholder='Last Name'
              value={lastName}
              onChangeText={(value) => {setLastName(value)}}
            />
          </View>
          <View>
            <Text>
              Email:
            </Text>
            <TextInput
              placeholder='example@email.com'
              value={email}
              onChangeText={(value) => {setEmail(value)}}
              inputMode='email'
            />
          </View>
          <View>
            <Text>
              Phone:
            </Text>
            <TextInput
              placeholder='999-999-9999'
              value={phone}
              onChangeText={(value) => {setPhone(value)}}
              inputMode='tel'
            />
          </View>
          <View>
            <Text>
              Time Of Contact:
            </Text>
            <RNPickerSelect 
              value={contact}
              onValueChange={(value) => setContact(value)}
              items={[
                {
                  'label':'Morning',
                  'value':'Morning'
                },
                {
                  'label':'Noon',
                  'value':'Noon'
                },
                {
                  'label':'Evening',
                  'value':'Evening'
                }
              ]}
            />
          </View>
          <TouchableOpacity onPress={() => {setModal(!modal)}}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </View>
      </Modal>
    </View>
  )
}

export default ScheduleTourComponent