import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { Text, View } from 'react-native'

const OpenHouseComponent = () => {

  const {property} = useContext(PropertyContext)
  console.log(property.listingSubType.isOpenHouse)

  const hasOpenHouse = () => {
    return(
      <View>
        <Text>Current Schedule:</Text>
        <View>
          {
            property.openHouseSchedule.map((event, index) => {
              return(
                <View key={index}>
                  <Text>Starts: {event.startTime}</Text>
                  <Text>Ends: {event.endTime}</Text>
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
        <Text>No current open houses scheduled</Text>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text>Open Houses:</Text>
      </View>
      {
        property.listingSubType.isOpenHouse === false ? hasNoOpenHouse() : hasOpenHouse()
      }
    </View>
  )
}

export default OpenHouseComponent