import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Api/firebaseTesting'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const OpenHouseComponent = () => {

  const {property} = useContext(PropertyContext)

  const [date, setDate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState('')

  const [accessTime, setAccessTime] = useState(false)


  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
  
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const year = dateTime.getFullYear();
    
    let hours = dateTime.getHours();
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    let ampm = 'am';
    
    if (hours >= 12) {
      ampm = 'pm';
      hours -= 12;
    }
    
    if (hours === 0) {
      hours = 12;
    }
    
    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;
    return formattedDateTime;
  }

  const hasOpenHouse = () => {
    return(
      <View>
        <View>
          {
            property.openHouseSchedule.map((event, index) => {
              return(
                <View key={index}>
                  <Text style={styles.text}>Starts: {formatDateTime(event.startTime)}</Text>
                  <Text style={styles.text}>Ends: {formatDateTime(event.endTime)}</Text>
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

  const submitRequest = () => {
    const address = property.abbreviatedAddress + ' ' + property.city + ', ' + property.state + ' ' + property.zipcode;
    const to = 'support@rippeapp.com';
    const from = email // Email addresses of recipients
    const subject = 'Rippe App Showing - ' + firstName + ' ' + lastName + ' - ' + address
    const body = 'This is a showing inquiry from ' + address + '. \n' + firstName + ' ' + lastName + ' is sending the following' + 
                  ' message regarding the property:' + address + ' at ' + date + ' \n\n Contact Details: \n' + firstName + ' ' + lastName + 
                  '\nPhone:' + phone + ' \n Email: ' + email + '.\n THe best time to reach ' + firstName + ' is ' + contact + '\n\n This email was automatically generated by Rippe. \n\n\n ' + 
                  'Rippe Inc. \nsupport@rippeapp.com \n (949) 403-7179 \n Los Angeles, CA' 

    const colRef = collection(db, 'ShowingTour')
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
      setContact('Morning')
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
          <TouchableOpacity onPress={() => {setAccessTime(!accessTime)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Time Of Contact: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{contact}</Text>
              {
                accessTime
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessTime
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={contact}
                  onValueChange={(value) => setContact(value)}
                >
                  <Picker.Item label='Morning' value='Morning' />
                  <Picker.Item label='Noon' value='Noon' />
                  <Picker.Item label='Evening' value='Evening' />
                </Picker>
          }
        </View>
        <TouchableOpacity style={[styles.closeContainer]} onPress={()  => {submitRequest()}}>
          <Text style={styles.close}>Schedule A Showing</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.listingContainerTablet}>
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
          <TouchableOpacity onPress={() => {setAccessTime(!accessTime)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Time Of Contact: </Text>
            <View style={styles.pickerLabelSection}>
              <Text style={styles.detailSection}>{contact}</Text>
              {
                accessTime
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessTime
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={contact}
                  onValueChange={(value) => setContact(value)}
                >
                  <Picker.Item label='Morning' value='Morning' />
                  <Picker.Item label='Noon' value='Noon' />
                  <Picker.Item label='Evening' value='Evening' />
                </Picker>
          }
        </View>
        <TouchableOpacity style={[styles.closeContainer]} onPress={()  => {submitRequest()}}>
          <Text style={styles.close}>Schedule A Showing</Text>
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
  listingContainerTablet: {
    width: aspectWidthTablet,
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

export default OpenHouseComponent