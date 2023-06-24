import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const deviceHeight = Dimensions.get('window').height

const AboutScreen = () => {
  const navigation = useNavigation()

  const goToWebsite = () => {
    Linking.canOpenURL('https://rippeapp.com').then(() => {
      Linking.openURL('https://rippeapp.com');
    });
  }

  const goToTwitter = () => {
    Linking.canOpenURL('twitter://user?screen_name=rippeapp').then(() => {
      Linking.openURL('twitter://user?screen_name=rippeapp');
    });
    Linking.canOpenURL('https://twitter.com/rippeapp').then(() => {
      Linking.openURL('https://twitter.com/rippeapp');
    });
  }

  const goToInstagram = () => {
    Linking.canOpenURL('instagram://user?username=rippeapp').then(() => {
      Linking.openURL('instagram://user?username=rippeapp');
    });
    Linking.canOpenURL('https://www.instagram.com/rippeapp/').then(() => {
      Linking.openURL('https://www.instagram.com/rippeapp/');
    });
  }

  return (
    <View style={
      deviceHeight > 900 
        ? styles.container 
        : deviceHeight > 800 && deviceHeight < 900 
          ? styles.containerM 
          : deviceHeight < 800
            ? styles.containerS
            : null
    }>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Feather name='chevron-left' size={28}/>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image style={{height: 80, width: 80}} source={require('../../Assets/RIPPE_LOGO_Blue.png')}/>
        </View>
        <View>
          <Text style={styles.name}>Rippe Group Inc.</Text>
          <Text style={styles.label}>Properties Rippe</Text>
          <Text style={styles.label}>For Investment</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rippe is a new real estate platform that was build form the ground up 
          with 1 goal in mind. Change the way that people look for, find, and purchase 
          investment properties. It is as simple as searching for a city you want to 
          invest in, look through the variety of properties, look at the investment 
          metrics for each property, and connect with one of our agents to start the 
          purchasing process.</Text>
      </View>
      <View style={styles.rowSB}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.label}>Rippe App</Text>
      </View>
      <View style={styles.rowSB}>
        <Text style={styles.label}>Company:</Text>
        <Text style={styles.label}>Rippe Group Inc.</Text>
      </View>
      <View style={styles.rowSB}>
        <Text style={styles.label}>Established:</Text>
        <Text style={styles.label}>March 1, 2023</Text>
      </View>
      <View style={styles.rowSB}>
        <Text style={styles.label}>Current Version</Text>
        <Text style={styles.label}>1.0.1</Text>
      </View>
      <View style={styles.rowSB}>
        <Text style={styles.label}>Website</Text>
        <TouchableOpacity onPress={() => {goToWebsite()}}>
          <Text style={styles.labelBlue}>rippeapp.com</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.rowC}>
        <TouchableOpacity onPress={() => {goToInstagram()}}>
          <Image style={{height: 40, width: 40}} source={require('../../assets/instagram.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {goToTwitter()}}>
          <Image style={{height: 40, width: 40}} source={require('../../assets/twitter.png')}/>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 54
  },
  containerM: {
    marginTop: 40
  },
  containerS: {
    marginTop: 20
  },
  containerTablet: {
    marginTop: 54
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginBottom: 8
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16,
    fontWeight: '700'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center'
  },
  imageContainer: {
    marginRight: 8
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4
  },  
  label: {
    fontSize: 17,
    fontWeight: '400'
  },
  rowSB: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between'
  },
  labelBlue: {
    fontSize: 17,
    fontWeight: '400',
    color: 'blue'
  },
  rowC: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center'
  }
})

export default AboutScreen