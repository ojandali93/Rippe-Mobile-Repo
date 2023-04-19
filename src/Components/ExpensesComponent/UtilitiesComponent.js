import React, { useContext } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const UtilitiesComponent = () => {

  const {water, setWater} = useContext(PropertyContext)
  const {trash, setTrash} = useContext(PropertyContext)
  const {electricity, setElectricity} = useContext(PropertyContext)
  const {gas, setGas} = useContext(PropertyContext)
  const {utilities} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>
          Utility Expeses: {utilities}
        </Text>
      </View>
      <View>
        <Text>
          Gas Expenses: {gas}
        </Text>
        <TextInput
          value={gas.toString()}
          onChangeText={(value) => setGas(value)}
        />
      </View>
      <View>
        <Text>
          Water Expenses: {water}
        </Text>
        <TextInput
          value={water.toString()}
          onChangeText={(value) => setWater(value)}
        />
      </View>
      <View>
        <Text>
          Trash Expenses: {trash}
        </Text>
        <TextInput
          value={trash.toString()}
          onChangeText={(value) => setTrash(value)}
        />
      </View>
      <View>
        <Text>
          Electricity Expenses: {electricity}
        </Text>
        <TextInput
          value={electricity.toString()}
          onChangeText={(value) => setElectricity(value)}
        />
      </View>
    </View>
  )
}

export default UtilitiesComponent