import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const SchoolsComponent = () => {

  const {property} = useContext(PropertyContext)

  const displayPhone = () => {
    return(
      <View>
        <View>
          {
            property.schools.map((item, index) => {
              return(
                <View style={styles.container} key={index}>
                  <View style={styles.subContainer}>
                    <View>
                      <Text style={styles.rating}>
                        {item.rating}/5
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <View style={styles.row}>
                        <View style={styles.nameRow}>
                          <Text style={styles.school}>
                            {
                              item.name.split('').length > 28 ? <Text>{item.name.substring(0,28)}...</Text> : <Text>{item.name}</Text>
                            }
                          </Text> 
                        </View>
                        <View style={styles.distanceRow}>
                          <Text style={styles.text}>
                            {item.distance} mil.
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View>
                          <Text style={styles.text}>
                            {item.level} School
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {item.type}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View>
        <View>
          {
            property.schools.map((item, index) => {
              return(
                <View style={styles.containerTablet} key={index}>
                  <View style={styles.subContainer}>
                    <View>
                      <Text style={styles.rating}>
                        {item.rating}/5
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <View style={styles.row}>
                        <View style={styles.nameRow}>
                          <Text style={styles.school}>
                            {
                              item.name.split('').length > 28 ? <Text>{item.name.substring(0,20)}...</Text> : <Text>{item.name}</Text>
                            }
                          </Text> 
                        </View>
                        <View style={styles.distanceRow}>
                          <Text style={styles.text}>
                            {item.distance} mil.
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View>
                          <Text style={styles.text}>
                            {item.level} School
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {item.type}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
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
  container: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
  },
  containerTablet: {
    width: aspectWidthTablet,
    marginLeft: 8,
    paddingVertical: 8,
  },
  subContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  },
  school: {
    fontSize: 18,
    fontWeight: '700'
  },
  info: {
    width: '85%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 8
  },
  nameRow: {
    width: '75%',
  },
  distanceRow: {
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rating: {
    fontSize: 22,
    padding: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'blue',
    color: 'white'
  }
})

export default SchoolsComponent