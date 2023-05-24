import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const DescriptionComponent = () => {

  const {property} = useContext(PropertyContext)

  const [accessFullDescription, setAccessFullDescription] = useState(false)

  function displayFirst200Words(inputString) {
    var trimmedString = inputString.trim()
                                  .split(' ')
                                  .slice(0, 50)
                                  .join(' ');
  
  
    return trimmedString;
  }

  return (
    <View style={styles.descriptionContainer}>
      <View>
        <Text style={styles.text}>
          {
            accessFullDescription ? <Text>{property.description}</Text> : <Text>{displayFirst200Words(property.description)}</Text>
          }
        </Text>
      </View>
      {
        accessFullDescription ? <TouchableOpacity onPress={() => {setAccessFullDescription(!accessFullDescription)}}>
                                  <Text style={styles.button}>Read Less</Text>
                                </TouchableOpacity>
                              : <TouchableOpacity onPress={() => {setAccessFullDescription(!accessFullDescription)}}>
                                  <Text style={styles.button}>Read More</Text>
                                </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  text: {
    fontSize: 18,
    fontWeight: 500
  },
  button: {
    paddingVertical: 8,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default DescriptionComponent