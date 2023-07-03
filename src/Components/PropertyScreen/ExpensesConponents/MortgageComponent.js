import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Feather } from 'react-native-vector-icons'
import { PropertyContext } from '../../../Context/PropertyContext'
import { FinancesContext } from '../../../Context/FinancesContext'
import { calculateDownPaymentAmount,
          calculateDownPaymentPercent,
          calculateLoanAmount,
          calculateMortgageAmount, 
          convertToDollarAmount} from '../../../../utilities' 

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 48
const aspectWidthTablet = deviceWidthTablet - 48

const MortgageComponent = () => {

  const loanOptions = [
    {
      'label': '30 Year Fixed',
      'value': 30
    },
    {
      'label': '15 Year Fixed',
      'value': 15
    }
  ]

  const {property} = useContext(PropertyContext)
  const {mortgage, setMortgage} = useContext(FinancesContext)
  const {dpAmount, setDbAmount} = useContext(FinancesContext)

  const [homePrice, setHomePrice] = useState(property.price)
  const [downPaymentAmount, setDownPaymentAmount] = useState(Math.round(property.price * .2))
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanAmount, setLoanAmount] = useState(Math.round(property.price * .8))
  const [interestRate, setInterestRate] = useState(property.mortgageRates.thirtyYearFixedRate)
  const [loanTerm, setLoanTerm] = useState(30)
  const [currentMortgage, setCurrentMortgage] = useState(calculateMortgageAmount(Math.round(property.price * .8), loanTerm, interestRate))

  const [accessMortgage, setAccessMortgage] = useState(false)
  const [accessLoan, setAccessLoan] = useState(false)

  useEffect(() => {
    setMortgage(currentMortgage)
    setDbAmount(downPaymentAmount)
  }, [])

  const updateHomePrice = (value) => {
    setHomePrice(value)
    let newDownPayment = calculateDownPaymentAmount(value, downPaymentPercent)
    let newLoanAmount = calculateLoanAmount(value, newDownPayment)
    setDownPaymentAmount(newDownPayment)
    setDbAmount(newDownPayment)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateHDownPaymentAmount = (value) => {
    setDownPaymentAmount(value)
    setDbAmount(value)
    let newDownPaymentPercent = calculateDownPaymentPercent(homePrice, value)
    let newLoanAmount = calculateLoanAmount(homePrice, value)
    setDownPaymentPercent(newDownPaymentPercent)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateDownPaymentPercent = (value) => {
    value > 0 ? null : value = 0
    setDownPaymentPercent(value)
    let newDownPaymentAmount = calculateDownPaymentAmount(homePrice, value) 
    let newLoanAmount = calculateLoanAmount(homePrice, newDownPaymentAmount)
    setDbAmount(newDownPaymentAmount)
    setDownPaymentAmount(newDownPaymentAmount)
    setLoanAmount(newLoanAmount)
    setMortgage(calculateMortgageAmount(newLoanAmount, loanTerm, interestRate))
  }

  const updateInterestRate = (value) => {
    setInterestRate(value)
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, parseFloat(value))
    setMortgage(newMortgageAmount)
  }

  const updateLoanTerms = (value) => {
    let newInterestRate
    if(value === 30){
      setLoanTerm(30)
      newInterestRate = property.mortgageRates.thirtyYearFixedRate
      setInterestRate(property.mortgageRates.thirtyYearFixedRate)
    }
    if(value === 15){
      setLoanTerm(15)
      newInterestRate = property.mortgageRates.fifteenYearFixedRate
      setInterestRate(property.mortgageRates.fifteenYearFixedRate)
    }
    let newMortgageAmount = calculateMortgageAmount(loanAmount, loanTerm, newInterestRate)
    setMortgage(newMortgageAmount)
  }

  const displayMortgageInfo = () => {
    return(
      <>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Home Price:
          </Text>
          <TextInput
            style={styles.input}
            inputMode='decimal'
            value={homePrice.toString()}
            onChangeText={(value) => {updateHomePrice(value)}}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Down Payment $: 
          </Text>
          <TextInput
            style={styles.input}
            inputMode='decimal'
            value={downPaymentAmount.toString()}
            onChangeText={(value) => {updateHDownPaymentAmount(value)}}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Down Payment %:
          </Text>
          <TextInput
            style={styles.input}
            inputMode='decimal'
            value={downPaymentPercent.toString()}
            onChangeText={(value) => {updateDownPaymentPercent(value)}}
          />
        </View>
        <View style={styles.itemContainerStatus}>
          <TouchableOpacity onPress={() => {setAccessLoan(!accessLoan)}} style={styles.pickerLabel}>
            <Text style={styles.detailSection}>Loan Program: </Text>
            <View style={styles.pickerLabelSection}>
              {
                loanTerm === 30 
                  ? <Text style={styles.detailSection}>30 Year Fixed</Text>
                  : <Text style={styles.detailSection}>15 Year Fixed</Text>
              }
              {
                accessLoan
                  ? <Feather size={22} color="#0039a6" name={'chevrons-up'}/>
                  : <Feather size={22} color="#0039a6" name={'chevrons-down'}/>
              }
            </View>
          </TouchableOpacity>
          {
            !accessLoan
              ? null
              : <Picker 
                  style={{ height: 200, width: '100%'}}
                  itemStyle={{ color: "black" }}
                  selectedValue={loanTerm}
                  onValueChange={(value) => setLoanTerm(value)}
                >
                  <Picker.Item label='30 Year Fixed' value={30} />
                  <Picker.Item label='15 Year Fixed' value={15} />
                </Picker>
          }
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            Interest Rate:
          </Text>
          <TextInput
            style={styles.input}
            inputMode='decimal'
            value={interestRate.toString()}
            onChangeText={(value) => {updateInterestRate(value)}}
          />
        </View>
      </>
    )
  }

  const displayPhone = () => {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {setAccessMortgage(!accessMortgage)}} >
          <View style={styles.mortgageAContainer}>
            <Text style={styles.mortgageAText}>Mortgage: ${convertToDollarAmount(mortgage)}</Text>
            <Feather size={20} name={'chevrons-down'} />
          </View>
        </TouchableOpacity>
        {
          accessMortgage ? displayMortgageInfo() : null
        }
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.containerTablet}>
        <TouchableOpacity onPress={() => {setAccessMortgage(!accessMortgage)}} >
          <View style={styles.mortgageAContainer}>
            <Text style={styles.mortgageAText}>Mortgage: ${convertToDollarAmount(mortgage)}</Text>
            <Feather size={20} name={'chevrons-down'} />
          </View>
        </TouchableOpacity>
        {
          accessMortgage ? displayMortgageInfo() : null
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
  },
  pickerLabel: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerLabelSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailSection: {
    fontSize: 18,
    fontWeight: '500'
  },
  itemContainerStatus: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 8
  }
})

export default MortgageComponent