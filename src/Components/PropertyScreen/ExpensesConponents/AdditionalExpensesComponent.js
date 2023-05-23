import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native'
import { FinancesContext } from '../../../Context/FinancesContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16

const AdditionalExpensesComponent = () => {

  const {otherExpenses, setOtherExpenses} = useContext(FinancesContext)
  
  const [maintenance, setMaintenance] = useState(0)
  const [management, setManagement] = useState(0)
  const [repairs, setRepairs] = useState(0)
  const [homeWarranty, setHomeWarranty] = useState(0)
  const [other, setOther] = useState(0)


  useEffect(() => {
    setOtherExpenses(parseInt(maintenance) + parseInt(management) + 
      parseInt(repairs) + parseInt(homeWarranty) + parseInt(other))
  }, [maintenance, management, repairs, homeWarranty, other])

  return (
    <View style={styles.container}>
      <View style={styles.mortgageAContainer}>
        <Text style={styles.mortgageAText}>
          Other Expenses: ${parseInt(otherExpenses)}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          maintenance {'(Annual)'}: 
        </Text>
        <TextInput  
          style={styles.input}
          value={maintenance.toString()}
          onChangeText={(value) => setMaintenance(value)}
        />
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Management {'(Annual)'}: 
        </Text>
        <TextInput
          value={management.toString()}
          style={styles.input}
          onChangeText={(value) => setManagement(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Repairs {'(Annual)'}: 
        </Text>
        <TextInput
          value={repairs.toString()}
          style={styles.input}
          onChangeText={(value) => setRepairs(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Home Warranty {'(Annual)'}: 
        </Text>
        <TextInput
          value={homeWarranty.toString()}
          style={styles.input}
          onChangeText={(value) => setHomeWarranty(value)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Other {'(Annual)'}: 
        </Text>
        <TextInput
          value={other.toString()}
          style={styles.input}
          onChangeText={(value) => setOther(value)}
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

export default AdditionalExpensesComponent