import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { PropertyContext } from '../../Context/PropertyContext'
import RNPickerSelect from 'react-native-picker-select'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const OpenHouseComponent = () => {

  const {property} = useContext(PropertyContext)

  const [date, setDate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState('')

  const hasOpenHouse = () => {
    return(
      <View>
        <Text>Current Schedule:</Text>
        <View>
          {
            property.openHouseSchedule.map((event, index) => {
              return(
                <View key={index}>
                  <Text style={styles.text}>Starts: {event.startTime}</Text>
                  <Text style={styles.text}>Ends: {event.endTime}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  const hasNoOpenHouse = () => {
    return(
      <View>
        <Text style={styles.text}>No current open houses scheduled</Text>
      </View>
    )
  }

  return (
    <View style={styles.listingContainer}>
      <View style={styles.agentContainer}>
        <Text style={styles.text}>
          Currently Showing Homes: 
        </Text>
      </View>
      {
        property.listingSubType.isOpenHouse === false ? hasNoOpenHouse() : hasOpenHouse()
      }
      <View style={styles.contentRow}>
        <Text style={styles.mainText}>
          Schedule A Showing:
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {setOpen(true)}}>
            <Text style={styles.text}>Select Date</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            date={date}
            customStyles={{ dateInput:{
                              borderWidth: 0,
                              borderBottomWidth: 2,
                              borderBottomColor: 'grey',
                              backgroundColor: 'lightgrey',
                              height: 30
                            },
                            dateText:{
                              fontSize: 18
                            },
                            dateIcon:{
                              height: 0, 
                              width:0
                            }
                          }}
            mode="date"
            placeholder="select date"
            format="MM-DD-YYYY"
            minDate="01-01-2023"
            maxDate="12-31-2040"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {setDate(date)}}
          />
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
      <View style={styles.colRow}>
        <Text style={styles.text}>
          Email:
        </Text>
        <TextInput
          style={styles.input}
          placeholder='example@email.com'
          value={email}
          onChangeText={(value) => {setEmail(value)}}
          inputMode='email'
        />
      </View>
      <View style={styles.colRow}>
        <Text style={styles.text}>
          Phone:
        </Text>
        <TextInput
          style={styles.input}
          placeholder='999-999-9999'
          value={phone}
          onChangeText={(value) => {setPhone(value)}}
          inputMode='tel'
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
          Time Of Contact:
        </Text>
        <RNPickerSelect 
          syle={styles.text}
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
      <TouchableOpacity style={[styles.closeContainer]}>
        <Text style={styles.close}>Connect With Agent</Text>
      </TouchableOpacity>
    </View>
  )
}

const pickerStyle = {
  placeholder: {
    color: 'black',
    fontSize: 22
  },
};

const styles = StyleSheet.create({
  listingContainer: {
    width: aspectWidth,
    marginLeft: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    paddingBottom: 8
  },
  agentContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems:'center'
  },
  datePicker: {
    borderWidth: 0
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  }, 
  leftColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  label: {
    fontSize: 18,
    fontWeight: '600'
  },
  text: {
    fontSize: 18
  },
  mainText: {
    fontSize: 18,
    fontWeight: '700'
  },
  datePickInput: {
    fontSize: 18,
    backgroundColor: 'lightgrey',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  contentRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopColor: 'lightgrey',
    borderTopWidth: 2
  },
  newRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colRow: {
    display: 'flex',
    paddingVertical: 8
  },
  column: {
    width: '48%',
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
    paddingVertical: 8,
    marginTop: 4
  },
  close: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8
  },
})

export default OpenHouseComponent