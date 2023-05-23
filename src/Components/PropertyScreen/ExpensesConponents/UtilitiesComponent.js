import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'
import { FinancesContext } from '../../../Context/FinancesContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16

const UtilitiesComponent = () => {
  const {utilities, setUtilities} = useContext(FinancesContext)

  const [water, setWater] = useState(0)
  const [gas, setGas] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [sewer, setSewer] = useState(0)
  const [trash, setTrash] = useState(0)

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(electricity) + parseInt(trash) + parseInt(water) + parseInt(sewer))
  }, [gas, electricity, trash, water, sewer])

  return (
    <View style={styles.container}>
      <View style={styles.mortgageAContainer}>
        <Text style={styles.mortgageAText}>
          Utility Expeses: ${utilities}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Gas Expenses: 
        </Text>
        <TextInput
          style={styles.input}
          value={gas.toString()}
          onChangeText={(value) => setGas(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Water Expenses: 
        </Text>
        <TextInput
          style={styles.input}
          value={water.toString()}
          onChangeText={(value) => setWater(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Sewer Expenses: 
        </Text>
        <TextInput
          style={styles.input}
          value={sewer.toString()}
          onChangeText={(value) => setSewer(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Trash Expenses: 
        </Text>
        <TextInput
          style={styles.input}
          value={trash.toString()}
          onChangeText={(value) => setTrash(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Electricity Expenses: 
        </Text>
        <TextInput
          style={styles.input}
          value={electricity.toString()}
          onChangeText={(value) => setElectricity(value)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: aspectWidth,
    marginLeft: 8,
  },
  mortgageAContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8
  },
  mortgageAText: {
    fontSize: 20,
    fontWeight: '600'
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500'
  },
  input: {
    width: '25%',
    fontSize: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  selector: {
    fontSize: 18
  }
})

export default UtilitiesComponent