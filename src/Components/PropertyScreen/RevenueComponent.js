import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Dimensions, TextInput, StyleSheet} from 'react-native'
import { FinancesContext } from '../../Context/FinancesContext'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16

const RevenueComponent = () => {
  const {property} = useContext(PropertyContext)
  const {totalRevenue, setTotalRevenue} = useContext(FinancesContext)
  
  const [revenue, setRevenue] = useState(property.rentZestimate)
  const [additionalRevenue, setAdditionalRevenue] = useState(0) 

  useEffect(() => {
    setTotalRevenue(parseInt(revenue) + parseInt(additionalRevenue))
  }, [])

  const updateRevenue = (value) => {
    setRevenue(value)
  }

  const updateAdditionalRevenue = (value) => {
    setAdditionalRevenue(value)
  }

  useEffect(() => {
    setTotalRevenue(parseInt(revenue) + parseInt(additionalRevenue))
  }, [revenue, additionalRevenue])

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Rent: 
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={revenue.toString()}
          onChangeText={(value) => {updateRevenue(value)}}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Additional Revenue: 
        </Text>
        <TextInput
          style={styles.input}
          inputMode='decimal'
          value={additionalRevenue.toString()}
          onChangeText={(value) => {updateAdditionalRevenue(value)}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: aspectWidth,
    marginLeft: 8,
    marginTop: 8
  },
  mortgageAContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  },
  mortgageAText: {
    fontSize: 20,
    fontWeight: '700'
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

export default RevenueComponent