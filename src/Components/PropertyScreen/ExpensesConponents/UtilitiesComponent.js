import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import { FinancesContext } from '../../../Context/FinancesContext'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 48

const UtilitiesComponent = () => {

  const [accessUtilities, setAccessUtilities] = useState(false)

  const {utilities, setUtilities} = useContext(FinancesContext)

  const [water, setWater] = useState(0)
  const [gas, setGas] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [sewer, setSewer] = useState(0)
  const [trash, setTrash] = useState(0)

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(electricity) + parseInt(trash) + parseInt(water) + parseInt(sewer))
  }, [gas, electricity, trash, water, sewer])

  const displayUtilities = () => {
    return(
      <>
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
      </>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {setAccessUtilities(!accessUtilities)}}>
        <View style={styles.mortgageAContainer}>
          <Text style={styles.mortgageAText}>
            Utility Expeses: ${utilities}
          </Text>
          <Feather size={20} name={'chevrons-down'} />
        </View>
      </TouchableOpacity>
      {
        accessUtilities ? displayUtilities() : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: aspectWidth,
    marginLeft: 24,
  },
  mortgageAContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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