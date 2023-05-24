import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { PropertyContext } from '../../../Context/PropertyContext'
import { FinancesContext } from '../../../Context/FinancesContext'
import { Feather } from 'react-native-vector-icons'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 48

const StaticComponents = () => {
  const {propertyTax, setPropertyTax} = useContext(FinancesContext)
  const {homeInsurance, setHomeInsurance} = useContext(FinancesContext)
  const {hoa, setHoa} = useContext(FinancesContext)
  const {property} = useContext(PropertyContext)

  const [taxRate, setTaxRate] = useState(property.propertyTaxRate)

  const [accessPropertyTax, setAccessPropertyTax] = useState(false)
  const [accessHomeInsurance, setAccessHomeInsurance] = useState(false)

  useEffect(() => {
    setPropertyTax(Math.round((property.price * (taxRate / 100)) / 12))
    setHomeInsurance((Math.round((property.price / 1000) * 4)).toFixed(0))
    console.log(property.resoFacts.hoaFee)
    property.resoFacts.hoaFee === null 
      ? setHoa(0)
      : setHoa(property.resoFacts.hoaFee)
  }, [])

  const updatePropertyTaxRate = (value) => {
    setTaxRate(value / 100)
    setPropertyTax(Math.round((property.price * (value / 100)) / 12))
  }

  const updateHomeInsurance = (value) => {
    setHomeInsurance(value)
  }

  const displayPropertyTax = () => {
    return(
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Property Tax Rate:
          </Text>
          <TextInput 
            value={taxRate.toString()}
            style={styles.input}
            onChangeText={(value) => {updatePropertyTaxRate(value)}}
          />
        </View>
      </>
    )
  }

  const displayHomeInsurance = () => {
    return(
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Home Insruance Annual:
          </Text>
          <TextInput 
            value={homeInsurance.toString()}
            style={styles.input}
            onChangeText={(value) => {updateHomeInsurance(value)}}
          />
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {setAccessPropertyTax(!accessPropertyTax)}}>
        <View style={styles.mortgageAContainer}>
          <Text style={styles.mortgageAText}>
            Property Tax: ${propertyTax}
          </Text>
          <Feather size={20} name={'chevrons-down'} />
        </View>
      </TouchableOpacity>
      {
        accessPropertyTax ? displayPropertyTax() : null
      }
      <TouchableOpacity onPress={() => {setAccessHomeInsurance(!accessHomeInsurance)}}>
        <View style={styles.mortgageAContainer}>
          <Text style={styles.mortgageAText}>
            Home Insurance: ${Math.round(homeInsurance / 12).toFixed(0)}
          </Text>
          <Feather size={20} name={'chevrons-down'} />
        </View>
      </TouchableOpacity>
      {
        accessHomeInsurance ? displayHomeInsurance() : null
      }
      <View style={styles.mortgageAContainer}>
        <View style={styles.mortgageAText}>
          {
            hoa === 0 
              ? <Text style={styles.mortgageAText}>HOA Fee: $0</Text> 
              : <Text style={styles.mortgageAText}>Hoa Fee: ${hoa}</Text>
          }
        </View>
      </View>
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

export default StaticComponents