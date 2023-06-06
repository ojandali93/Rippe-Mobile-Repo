import React, {useContext, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet} from 'react-native'
import { auth, db } from '../Api/firebaseTesting'
import { useNavigation } from '@react-navigation/native'
import { where, query, collection, onSnapshot } from 'firebase/firestore';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = deviceHeight - 100
const aspectHeightMain = (deviceWidth / 1.78) + 1
const screenHeight = Dimensions.get('window').height - 202

const RecentlyViewedScreen = () => {
  const navigation = useNavigation()

  const [recentViews, setRecentViews] = useState([])

  useEffect(() => {
    auth.currentUser === null 
      ? null
      : grabRecentView()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? null
        : grabRecentView()
    })
    return unsubscribe
  }, [navigation])

  const grabRecentView = () => {
    const collectionRef = collection(db, 'RecentViews')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let recentViewsList = []
      snapshot.docs.forEach((doc) => {
        recentViewsList.push({ ...doc.data(), id: doc.id })
      })
      setRecentViews(recentViewsList)
    })
  }

  const displayNone = () => {
    return(
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.header}>You have no recent views!</Text>
        </View>
      </View>
    )
  }

  const displayProperties = () => {
    return(
      <ScrollView>
        {
          recentViews.map((property) => {
            return(
              <View key={property.property.zpid}>
                <TouchableOpacity style={styles.property} onPress={() => {}}> 
                  <View>
                    <Image style={{height: aspectHeightMain, width: aspectWidth}} source={{uri: property.property.ingSrc}}/>
                    <View style={styles.summary}>
                      <View style={styles.background}></View>
                      <View>
                        <Text style={[styles.text, styles.price, styles.summaryInfo]}>${property.property.price}</Text>
                      </View>
                      <View>
                      <Text style={styles.address}>
                          {property.property.address}
                        </Text>
                        <Text style={styles.address}>
                          {property.property.city}, {property.property.state} {property.property.zipcode}
                        </Text>
                      </View>
                      <View style={styles.bottomRowSummary}>
                        <Text style={styles.address}>
                          {property.property.bedrooms} Beds | {property.property.bathrooms} Bath | {property.property.livingArea} Sqft.
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
        </ScrollView>
    )
  }

  return (
    <View style={styles.screen}>
      {
        recentViews.length === 0 
          ? displayNone() 
          : displayProperties()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 58,
    marginLeft: 8
  },
  property: {
    width: aspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
  },
  summary: {
    position: 'absolute',
    padding: 8
  },
  background: {
    position: 'absolute',
    height: aspectHeightMain,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeightMain - 100
  },
  text: {
    color: 'white'
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  address: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16
  },
  bottomRowSummary: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainContainer: {
    width: aspectWidth,
    height: aspectHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4132e1',
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 8
  },
  close: {
    paddingVertical: 6,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  nonDataScreen: {
    width: aspectWidth,
    height: screenHeight - 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonDataText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
})

export default RecentlyViewedScreen