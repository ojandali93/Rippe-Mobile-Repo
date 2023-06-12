import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { properties } from '../../Api/zillowApi'
import axios from 'axios'
import { db, auth } from '../../Api/firebaseTesting'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 24
const aspectHeight = (deviceWidth / 1.78) + 1

const SellHomeScreen = () => {
  const navigation = useNavigation()

  const [addressLookup, setAddressLookup] = useState('')
  const [property, setProperty] = useState()
  const [loading, setLoading] = useState(false)
  const [sellTime, setSellTime] = useState('')
  const [reason, setReason] = useState('')
  const [purchasing, setPurchasing] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [improvements, setImprovements] = useState('')
  const [improvementDetails, setImprovementDetails] = useState('')
  const [paidOff, setPaidOff] = useState('')
  const [appraised, setAppriased] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [aboutYourself, setAboutYourself] = useState('')
  const [validProperty, setValidProperty] = useState(false)

  const searchLookupAddress = () => {
    setLoading(true)
    properties.params.location = addressLookup
    axios.request(properties)
      .then((response) => {
        response.data.zpid
          ? propertyFound(response)
          : alert('Property Not FOund')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const submitRequest = () => {
    let address = property.abbreviatedAddress + '. ' + property.address.city + ', ' + property.address.state + ' ' + property.address.zipcode
    const collectionRef = collection(db, 'SellMyHome')
    addDoc(collectionRef, {
      "name": name,
      "email":email,
      "phone":phone,
      "aboutYourself":aboutYourself,
      "property": address,
      "sellTime":sellTime,
      "reason":reason,
      "purchasing": purchasing,
      "lookingFor":lookingFor,
      "improvements":improvements,
      "improvementDetails":improvementDetails,
      "paidOff": paidOff,
      "appraised":appraised,
      "userId": auth.currentUser.uid,
      "createdAd":serverTimestamp()
    }).then((response) => {
      setName('')
      setEmail('')
      setPhone('')
      setAboutYourself('')
      setProperty('')
      setSellTime('')
      setReason('')
      setPurchasing('')
      setLookingFor('')
      setImprovements('')
      setImprovementDetails('')
      setPaidOff('')
      appraised('')
      navigation.navigate('ProfileScreen')
    }).catch((error) => {
      console.error(error)
    })
  }

  const propertyFound = (response) => {
    setProperty(response.data)
    setLoading(false)
    setValidProperty(true)
  }

  const showProperty = () => {
    return(
      <View style={styles.imgContainer}>
        <Image style={[{height: aspectHeight, width: aspectWidth}]} source={{uri: property.hiResImageLink}}/>
        <View style={[styles.overlay, {height: aspectHeight, width: aspectWidth}]}></View>
        <View style={styles.summaryContainer}>
          <View style={styles.tileRow}>
            <Text style={styles.price}>${property.price}</Text>
            <Text style={styles.whiteLabel}>Single Family</Text>
          </View>
          <View style={styles.tileRow}>
            <Text style={styles.whiteLabel}>{property.bedrooms} Beds 
                                      | {property.bathrooms} Baths 
                                      | {property.livingArea} sqft.</Text>
          </View>
          <View style={styles.tileRow}>
            <View>
              <Text style={[styles.whiteLabel, styles.spacer]}>{property.abbreviatedAddress}.</Text>
              <Text style={styles.whiteLabel}>{property.address.city + ', ' + property.address.state + ' ' + property.address.zipcode}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sell My Home</Text>
        </View>
        <TouchableOpacity style={styles.backContainer} onPress={() => {navigation.goBack()}}>
          <Text style={styles.subHeader}>Back</Text>
        </TouchableOpacity>
        <View style={styles.rowSearch}>
          <Feather style={styles.chevronDownSearch} size={20} name='search'/>
          <TextInput 
            value={addressLookup}
            style={styles.inputSearch}
            onChangeText={(value) => {setAddressLookup(value)}}
            placeholder={'Enter an address'}
          />
          <TouchableOpacity style={styles.searcingContainer} onPress={() => {searchLookupAddress()}}>
            <Text style={styles.searchSubmit}>Search</Text>
          </TouchableOpacity>
        </View>
        {
          loading ? <Text>Loading</Text> : validProperty ? showProperty() : null
        }
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Time To Sell?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('3 days')}}>
              <Text style={styles.label}>3 days</Text>
              {
                sellTime == '3 days' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('1 week')}}>
              <Text style={styles.label}>1 Week</Text>
              {
                sellTime == '1 week' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('2 weeks')}}>
              <Text style={styles.label}>2 Weeks</Text>
              {
                sellTime == '2 weeks' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('1 month')}}>
              <Text style={styles.label}>1 Month</Text>
              {
                sellTime == '1 month' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('2 months')}}>
              <Text style={styles.label}>2 Months</Text>
              {
                sellTime == '2 months' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('3+ months')}}>
              <Text style={styles.label}>3+ Months</Text>
              {
                sellTime == '3+ months' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setSellTime('other')}}>
              <Text style={styles.label}>Other</Text>
              {
                sellTime == 'other' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Reason For Selling?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Upgrade my home')}}>
              <Text style={styles.label}>Upgrade my home</Text>
              {
                reason == 'Upgrade my home' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Selling non-primary home')}}>
              <Text style={styles.label}>Selling non-primary home</Text>
              {
                reason == 'Selling non-primary home' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Relocation')}}>
              <Text style={styles.label}>Relocation</Text>
              {
                reason == 'Relocation' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Downsizing')}}>
              <Text style={styles.label}>Downsizing </Text>
              {
                reason == 'Downsizing' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Retiring')}}>
              <Text style={styles.label}>Retiring</Text>
              {
                reason == 'Retiring' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Other')}}>
              <Text style={styles.label}>Other</Text>
              {
                reason == 'Other' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Purchasing A New Home?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setPurchasing('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                purchasing == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
              {
                purchasing == 'Yes' ? <View style={styles.column}>
                                      <Text style={styles.label}>What are you looking for?</Text>
                                      <TextInput 
                                        value={lookingFor}
                                        onChangeText={(value) => {setLookingFor(value)}}
                                        multiline={true}
                                        style={styles.input}
                                        placeholder={'New home...'}
                                      />
                                    </View>
                                  : null
              }
            <TouchableOpacity style={styles.row} onPress={() => {setPurchasing('No')}}>
              <Text style={styles.label}>No</Text>
              {
                purchasing == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setPurchasing('Undecided')}}>
              <Text style={styles.label}>Undecided</Text>
              {
                purchasing == 'Undecided' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Any Property Improvements?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setImprovements('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                improvements == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            {
                improvements == 'Yes' ? <View style={styles.column}>
                                      <Text style={styles.label}>Describe improvements:</Text>
                                      <TextInput 
                                        value={improvementDetails}
                                        onChangeText={(value) => {setImprovementDetails(value)}}
                                        multiline={true}
                                        style={styles.input}
                                        placeholder={'Improvements...'}
                                      />
                                    </View>
                                  : null
              }
            <TouchableOpacity style={styles.row} onPress={() => {setImprovements('No')}}>
              <Text style={styles.label}>No</Text>
              {
                improvements == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Is The Property Paid Off?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setPaidOff('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                paidOff == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setPaidOff('No')}}>
              <Text style={styles.label}>No</Text>
              {
                paidOff == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Has The Property Been Appraised?</Text>
            </View>
            <TouchableOpacity style={styles.row} onPress={() => {setAppriased('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                appraised == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setAppriased('No')}}>
              <Text style={styles.label}>No</Text>
              {
                appraised == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>



          <View style={styles.section}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>About You</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Contact Name:</Text>
              <TextInput 
                value={name}
                onChangeText={(value) => {setName(value)}}
                style={styles.input}
                placeholder={'John Doe'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Contact Number:</Text>
              <TextInput 
                value={phone}
                onChangeText={(value) => {setPhone(value)}}
                style={styles.input}
                keyboardType={'numeric'}
                placeholder={'951-534-3666'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Contact Email:</Text>
              <TextInput 
                value={email}
                onChangeText={(value) => {setEmail(value)}}
                style={styles.input}
                keyboardType={'numeric'}
                placeholder={'example@email.com'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>About Yourself:</Text>
              <TextInput 
                value={aboutYourself}
                onChangeText={(value) => {setAboutYourself(value)}}
                style={styles.input}
                multiline={true}
                placeholder={'Any details we should know about your or your property...'}
              />
            </View>
          </View>
          <View style={styles.disclaimer}>
            <Text style={styles.disclaim}>** Rype charges a 1.5% listing fee based on selling price **</Text>
          </View>
          <TouchableOpacity style={styles.submitContainer} onPress={() => {submitRequest()}}>
            <Text style={styles.submitLabel}>Submit Information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 54
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16,
    fontWeight: '700'
  },
  
  row: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 17
  },
  labelRed: {
    fontSize: 17,
    color: 'red'
  },
  separater: {
    height: 16
  },
  input: {
    width: '100%',
    backgroundColor: 'lightgrey',
    fontSize: 17,
    paddingVertical: 4,
    color: 'black',
    marginTop: 6
  },
  rowSearch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronDownSearch: {
    color: '#1c39bb',
    marginLeft: 16,
    marginRight: 6
  },
  inputSearch: {
    width: '70%',
    fontSize: 17,
    paddingTop: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  searcingContainer: {
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchSubmit: {
    fontSize: 17,
    color: '#273be2'
  },
  submitContainer: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1560bd',
    paddingVertical: 16,
    borderRadius: 5
  },
  submitLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 8
  },
  disclaimer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  imgContainer: {
    margin: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: .35,
    top: 0,
    left: 0,
  },
  summaryContainer: {
    width: '100%',
    paddingHorizontal: 8,
    position: 'absolute',
    top: aspectHeight - 114
  },
  tileRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4
  },
  whiteLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  column: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
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
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  backContainer: {
    position: 'absolute',
    left: 8,
    top: 8
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: '500'
  },
  subHeaderContainer: {
    height: 38,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    backgroundColor: 'lightgrey',
    paddingLeft: 8
  },
})

export default SellHomeScreen