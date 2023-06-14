import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { FinancesContext } from '../../Context/FinancesContext'
import { PropertyContext } from '../../Context/PropertyContext'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 48
const aspectWidthTablet = deviceWidthTablet - 48

const RevenueComponent = () => {

  const [accessRevenue, setAccessRevenue] = useState(false)

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

  const displayRevenue = () => {
    return(
      <>
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
      </>
    )
  }

  const displayPhone = () => {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {setAccessRevenue(!accessRevenue)}}>
          <View style={styles.mortgageAContainer}>
            <Text style={styles.mortgageAText}>
              Revenue: ${totalRevenue}
            </Text>
            <Feather size={20} name={'chevrons-down'} />
          </View>
        </TouchableOpacity>
        {
          accessRevenue ? displayRevenue() : null
        }
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.containerTablet}>
        <TouchableOpacity onPress={() => {setAccessRevenue(!accessRevenue)}}>
          <View style={styles.mortgageAContainer}>
            <Text style={styles.mortgageAText}>
              Revenue: ${totalRevenue}
            </Text>
            <Feather size={20} name={'chevrons-down'} />
          </View>
        </TouchableOpacity>
        {
          accessRevenue ? displayRevenue() : null
        }
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
    marginLeft: 24,
  },
  containerTablet: {
    width: aspectWidthTablet,
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
    fontWeight: '700'
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
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