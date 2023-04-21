import React, { useContext, useEffect } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const UtilitiesComponent = () => {

  const {water, setWater} = useContext(PropertyContext)
  const {trash, setTrash} = useContext(PropertyContext)
  const {electricity, setElectricity} = useContext(PropertyContext)
  const {gas, setGas} = useContext(PropertyContext)
  const {utilities, setUtilities} = useContext(PropertyContext)

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(electricity) + parseInt(trash) + parseInt(water))
  }, [gas, electricity, trash, water])

  return (
    <View>
      <View>
        <Text>
          Utility Expeses: {utilities}
        </Text>
      </View>
      <View>
        <Text>
          Gas Expenses: {parseInt(gas)}
        </Text>
        <TextInput
          value={gas.toString()}
          onChangeText={(value) => setGas(value)}
        />
      </View>
      <View>
        <Text>
          Water Expenses: {parseInt(water)}
        </Text>
        <TextInput
          value={water.toString()}
          onChangeText={(value) => setWater(value)}
        />
      </View>
      <View>
        <Text>
          Trash Expenses: {parseInt(trash)}
        </Text>
        <TextInput
          value={trash.toString()}
          onChangeText={(value) => setTrash(value)}
        />
      </View>
      <View>
        <Text>
          Electricity Expenses: {parseInt(electricity)}
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