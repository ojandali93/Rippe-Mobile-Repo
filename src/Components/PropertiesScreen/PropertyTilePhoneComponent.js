import React, { useContext, useEffect, useState } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { useNavigation } from '@react-navigation/native'

import { Entypo, Feather } from 'react-native-vector-icons'

import { metricInfo, propertyTaxPercentages } from '../../../metricInfo'
import { FavoritesContext } from '../../Context/FavoritesContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../Api/firebaseTesting'
import { PropertyContext } from '../../Context/PropertyContext'
import { convertNumberToFormattedNumber, convertToDollarAmount } from '../../../utilities'
import { 
  calculateDownPaymentAmount ,
  calculateDownPaymentPercent,
  calculateLoanAmount,
  calculateMortgageAmount,
  calculateHomeInsuranceAmount,
  calculatePropertyTaxAnnual
} from '../../../utilities'

import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1
const splitWidth = 360
const splitHeight = (splitWidth / 1.78) + 1

const PropertyTilePhoneComponent = (props) => {
  const {property} = props

  const navigation = useNavigation()

  const {
    favoritesZpids,
    addFavorite,
    removeFromFavorites
  } = useContext(FavoritesContext)

  const {accessToken} = useContext(PropertiesContext)

  const [accessMonthlyExpenses, setAccessMonthlyExpenses] = useState(false)
  const [accessMortgage, setAccessMortgage] = useState(false)
  const [accessNOI, setAccessNOI] = useState(false)
  const [accessCapRate, setAccessCapRate] = useState(false)
  const [accessMonthlyRevenue, setAccessMonthlyRevenue] = useState(false)
  const [accessCashFlow, setAccessCashFlow] = useState(false)
  const [accessCashOnCashFlow, setAccessCashOnCashFlow] = useState(false)
  const [accessROI, setAccessROI] = useState(false)
  const [metricLoading, setMetricLoading] = useState(true)

  const [monthlyRevenueAmount, setMonthlyRevenueAmount] = useState(false)
  const [monthlyExpenses, setMonthlyExpenses] = useState(false)
  const [mortgageAmount, setMortgageAmount] = useState(false)
  const [cashFlow, setCashFlow] = useState(false)
  const [NetOperatingIncome, setNetOperatingIncome] = useState(false)
  const [capRate, setCapRate] = useState(false)
  const [cocReturn, setCocReturn] = useState(false)
  const [returnOnInvestment, setReturnOnInvestment] = useState(false)

  const taxRate = propertyTaxPercentages[property.state]

  useEffect(() => {
    calcInvestmentMetrics()
  }, [])

  const calcInvestmentMetrics = () => {
    let downPaymentAmount = calculateDownPaymentAmount(property.price, 20)
    let downPaymentPercent = calculateDownPaymentPercent(property.price, downPaymentAmount)
    let loanAmount = calculateLoanAmount(property.price, downPaymentAmount)
    setMortgageAmount(calculateMortgageAmount(loanAmount, 30, 6.485))
    let mortgageAmount = calculateMortgageAmount(loanAmount, 30, 6.485)
    let monthlyTaxAmount = Math.round((calculatePropertyTaxAnnual(taxRate, property.price)) / 12)
    let homeInsurance = calculateHomeInsuranceAmount(property.price)
    setMonthlyRevenueAmount(property.rentZestimate)
    let monthlyRevenue = property.rentZestimate
    let expenses = 0
    let hoaFee = property.hoaFee
    hoaFee === null 
      ? expenses = mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance 
      : expenses = mortgageAmount + monthlyTaxAmount + homeInsurance
    let monthlyExpenses = 0
    let monthlyExpensesWithoutMortgage = 0
    hoaFee === null
      ? monthlyExpensesWithoutMortgage = hoaFee + monthlyTaxAmount + homeInsurance
      : monthlyExpensesWithoutMortgage = monthlyTaxAmount + homeInsurance
    hoaFee === null
      ? setMonthlyExpenses(mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance)
      : setMonthlyExpenses(mortgageAmount + monthlyTaxAmount + homeInsurance)
    setNetOperatingIncome(Math.round(monthlyRevenue - monthlyExpensesWithoutMortgage))
    let netOperatingIncome = Math.round(monthlyRevenue - monthlyExpensesWithoutMortgage)
    let yearlyNetOperatingIncome = netOperatingIncome * 12
    setCashFlow(Math.round(netOperatingIncome - mortgageAmount))
    let monthlyCashFLowAmount = Math.round(netOperatingIncome - mortgageAmount)
    let yearlyCashFlow = monthlyCashFLowAmount * 12
    setCapRate(((yearlyNetOperatingIncome / property.price) * 100).toFixed(2))
    setCocReturn(((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2))
    setReturnOnInvestment(((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2))
    setMetricLoading(false)
  }

  const formatStatus = (status) => {
    let currentStatus = status
    let formattedString = currentStatus.toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    return formattedString
  }

  const updateAddFavorite = (property) => {
    auth.currentUser === null
      ? alert('Not Logged In') 
      : addFavorite(property) 
  }

  const updateRemoveFavorite = (property) => {
    auth.currentUser === null
      ? alert('Not Logged In')
      : removeFromFavorites(property) 
  }

  const addPropertyView = (property) => {
    auth.currentUser === null   
      ? navigation.navigate('PropertyScreen', {zpid: property.zpid})
      : updatePropertyView(property)
  }

  const updatePropertyView = (property) => {
    let newProperty = {}
    newProperty.zpid = property.zpid
    newProperty.ingSrc = property.imgSrc
    newProperty.bedrooms = property.bedrooms
    newProperty.bathrooms = property.bathrooms
    newProperty.livingArea = property.livingArea
    newProperty.address = property.streetAddress
    newProperty.city = property.city
    newProperty.state = property.state
    newProperty.zipcode = property.zipcode
    newProperty.homeStatus = property.homeStatus
    newProperty.price = property.price
    const colRef = collection(db, 'RecentViews')
    addDoc(colRef, {
      userId: auth.currentUser.uid,
      property: newProperty,
      createdAt: serverTimestamp()
    }).then(() => {
      navigation.navigate('PropertyScreen', {zpid: property.zpid})
    }).catch((error) => {
           (error)
    })
  }

  const showGreatInvestment = () => {
    return(
      <View style={styles.favoriteMenu}>
        <View style={styles.greatInvestmentContainer}>
          <Feather size={20} color={'white'} style={styles.zap} name={'zap'}/>
          <Text style={styles.greatText}>Great Investment</Text>
        </View>
        <View>
          {
            favoritesZpids.includes(property.zpid)
              ? <TouchableOpacity onPress={() => {updateRemoveFavorite(property)}}><Entypo color={'white'} size={28} name='heart'  stlye={styles.menu}/></TouchableOpacity>
              : <TouchableOpacity onPress={() => {updateAddFavorite(property)}}><Entypo color={'white'} size={28} name='heart-outlined'  stlye={styles.menu}/></TouchableOpacity>
          }
        </View>
      </View>
    )
  }

  const showStandardMenu = () => {
    return(
      <View style={styles.favoriteMenuStandard}>
        {
          favoritesZpids.includes(property.zpid)
            ? <TouchableOpacity onPress={() => {updateRemoveFavorite(property)}}><Entypo color={'white'} size={28} name='heart'  stlye={styles.menu}/></TouchableOpacity>
            : <TouchableOpacity onPress={() => {updateAddFavorite(property)}}><Entypo color={'white'} size={28} name='heart-outlined'  stlye={styles.menu}/></TouchableOpacity>
        }
      </View>
    )
  }

  const displayLoadingPhone = () => {
    return(
      <View>
        <Text style={styles.loadingText}>Calculating Metrics</Text>
        <ActivityIndicator style={styles.loading} size='large'/>
      </View>
    )
  }

  const displayMetricsPhone = () => {
    return(
      <View style={styles.investmentComponent}>
        <View style={styles.column}> 
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Monthly Rev.:</Text>
              <TouchableOpacity style={{marginLeft: 8}} onPress={() => {setAccessMonthlyRevenue(!accessMonthlyRevenue)}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>
              ${convertToDollarAmount(monthlyRevenueAmount)}
            </Text>
          </View>

          <Modal
            visible={accessMonthlyRevenue}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.grossMonthlyRevenue.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.grossMonthlyRevenue.info}</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyRevenue(!accessMonthlyRevenue)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Monthly Exp.:</Text>
              <TouchableOpacity onPress={() => {setAccessMonthlyExpenses(!accessMonthlyExpenses)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>
              ${convertToDollarAmount(monthlyExpenses)}
            </Text>
          </View>
          <Modal
            visible={accessMonthlyExpenses}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.totalMonthlyExpenses.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.totalMonthlyExpenses.info}</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyExpenses(!accessMonthlyExpenses)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Mortgage:</Text>
              <TouchableOpacity  onPress={() => {setAccessMortgage(!accessMortgage)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>
              ${convertToDollarAmount(mortgageAmount)}
            </Text>
          </View>
          <Modal
            visible={accessMortgage}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.mortgage.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.mortgage.info}</Text>
                <TouchableOpacity onPress={() => {setAccessMortgage(!accessMortgage)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Cash Flow:</Text>
              <TouchableOpacity onPress={() => {setAccessCashFlow(!accessCashFlow)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>
              ${convertToDollarAmount(cashFlow)}
            </Text>
          </View>

          <Modal
            visible={accessCashFlow}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.monthlyCashFlow.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.monthlyCashFlow.info}</Text>
                <TouchableOpacity onPress={() => {setAccessCashFlow(!accessCashFlow)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Net Operating Income:</Text>
              <TouchableOpacity onPress={() => {setAccessNOI(!accessNOI)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>  
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>
              ${convertToDollarAmount(NetOperatingIncome)}
            </Text>
          </View>
          <Modal
            visible={accessNOI}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.monthlyNOI.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.monthlyNOI.info}</Text>
                <TouchableOpacity onPress={() => {setAccessNOI(!accessNOI)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Cap Rate:</Text>
              <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>{capRate}%</Text>
          </View>
          <Modal
            visible={accessCapRate}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.capRate.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.capRate.info}</Text>
                <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>CoC Return:</Text>
              <TouchableOpacity onPress={() => {setAccessCashOnCashFlow(!accessCashOnCashFlow)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>{cocReturn}%</Text>
          </View>

          <Modal
            visible={accessCashOnCashFlow}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.cashOnCashReturn.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.cashOnCashReturn.info}</Text>
                <TouchableOpacity onPress={() => {setAccessCashOnCashFlow(!accessCashOnCashFlow)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.metric}>
            <View style={styles.key}>
              <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>Return On Invesetment:</Text>
              <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}} style={{marginLeft: 8}}>
                <Feather size={deviceWidth < 800 ? 18 : 20} name={'info'}/>
              </TouchableOpacity>
            </View>
            <Text style={deviceWidth < 800 ? styles.metricTextS : styles.metricText}>{returnOnInvestment}%</Text>
          </View>

          <Modal
            visible={accessROI}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCOntent}>
                <Text style={styles.label}>{metricInfo.rOI.label}</Text>
                <Text style={styles.modalInfo}>{metricInfo.rOI.info}</Text>
                <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    )
  }

  return (
    <View key={property.zpid} style={styles.property}>
      <TouchableOpacity onPress={() => {addPropertyView(property)}}> 
        <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.imgSrc}}/>
        <View style={styles.summary}>
          <View style={styles.background}></View>  
          <>
            {
              parseInt(cashFlow) > 750 && parseInt(NetOperatingIncome) > 900 && parseFloat(capRate) > 6 && parseFloat(cocReturn) > 6 && parseFloat(returnOnInvestment) > 7
                ? showGreatInvestment()
                : showStandardMenu()
            }
          </>
          <View>
            <Text style={[styles.text, styles.price, styles.summaryInfo]}>${convertToDollarAmount(property.price)}</Text>
          </View>
          <View>
            <Text style={styles.address}>
              {property.streetAddress}
            </Text>
            <Text style={styles.address}>
              {property.city}, {property.state} {property.zipcode}
            </Text>
          </View>
          <View style={styles.bottomRowSummary}>
            <Text style={styles.address}>
              {property.bedrooms} Beds | {property.bathrooms} Bath | {convertNumberToFormattedNumber(property.livingArea)} Sqft.
            </Text>
            <Text style={styles.address}>
              {formatStatus(property.homeStatus)}
            </Text>
          </View>
        </View>
        {
          metricLoading ? displayLoadingPhone() : displayMetricsPhone()
        }
        <View style={styles.hSplit}></View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>Metrics based on 20% down / 30 years / 6.485% IR</Text>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.tabletDisclaimer}>Property tax: {taxRate}% - Based on state avg.</Text>
        </View>
        <View style={[styles.disclaimerContainer, {marginBottom: 8}]}>
          <Text style={styles.tabletDisclaimer}>VIEW PROPERTY FOR EXACT NUMBERS</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginLeft: 8,
    marginBottom: 250
  },
  tabletScroll: {
    marginLeft: 8,
    marginBottom: 250
  },
  tabletProperty: {
    width: splitWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
  },
  property: {
    width: aspectWidth,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#E8E8E8'
  },
  summary: {
    position: 'absolute',
    padding: 8
  },
  tabletBackground: {
    position: 'absolute',
    height: splitHeight,
    width: splitWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  background: {
    position: 'absolute',
    height: aspectHeight,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4
  },
  tabletFavoriteMenu: {
    width: splitWidth - 16,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  favoriteMenuStandard: {
    width: aspectWidth - 16,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tabletFavoriteMenuStandard: {
    width: splitWidth - 16,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4
  },
  summaryInfo: {
    marginTop: aspectHeight - 145
  },
  tabletSummaryInfo: {
    marginTop: splitHeight - 150
  },
  text: {
    color: 'white'
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  address: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16
  },
  bottomRowSummary: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  investmentComponent: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  metric: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2
  },
  column: {
    width: '100%'
  },
  hSplit: {
    width: '96%',
    marginLeft: '2%',
    height: 2,
    backgroundColor: 'grey'
  },
  disclaimerContainer: {
    width: '96%',
    marginLeft: '2%',
    paddingTop: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  disclaimer: {
    color: 'grey'
  },
  tabletDisclaimer: {
    fontSize: 12,
    color: 'grey'
  },
  metricText: {
    fontSize: 20,
    fontWeight: '500'
  },
  metricTextS: {
    fontSize: 16,
    fontWeight: '500'
  },
  tabletMetricText: {
    fontSize: 18,
    fontWeight: '500'
  },
  key: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoCOntainer: {
    height: 16,
    width: 16,
    backgroundColor: 'grey',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  },
  info: {
    fontSize: 8,
    fontWeight: '900',
    color: 'white',
  },
  modalContainer: {
    width: aspectWidth,
    height: deviceheight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCOntent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalInfo: {
    textAlign: 'justify',
    marginBottom: 16
  },
  close: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
  greatInvestmentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#0039a6',
    borderRadius: 8
  },
  greatText: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 600,
    marginLeft: 4
  },
})

export default PropertyTilePhoneComponent