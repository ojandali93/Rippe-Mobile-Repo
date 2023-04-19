import React, { useContext } from 'react'
import {View, Text} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const HoaComponent = () => {

  const {hoa} = useContext(PropertyContext)

  return (
    <View>
      <View>
        {
          hoa === null ? <Text>HOA Fee: 0</Text> : <Text>Hoa Fee: {hoa}</Text>
        }
      </View>
    </View>
  )
}

export default HoaComponent