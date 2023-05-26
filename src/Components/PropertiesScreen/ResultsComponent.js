import React, { useContext, useEffect, useState } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal} from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { useNavigation } from '@react-navigation/native'

import { Entypo } from 'react-native-vector-icons'

import { ProfileContext } from '../../Context/ProfileContext'

import { metricInfo } from '../../../metricInfo'
import { FavoritesContext } from '../../Context/FavoritesContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const ResultsComponent = () => {
  const navigation = useNavigation()

  const {
    favoritesZpids,
    addFavorite,
    removeFromFavorites
  } = useContext(FavoritesContext)

  const [accessMonthlyExpenses, setAccessMonthlyExpenses] = useState(false)
  const [accessMortgage, setAccessMortgage] = useState(false)
  const [accessNOI, setAccessNOI] = useState(false)
  const [accessCapRate, setAccessCapRate] = useState(false)
  const [accessMonthlyRevenue, setAccessMonthlyRevenue] = useState(false)
  const [accessCashFlow, setAccessCashFlow] = useState(false)
  const [accessCashOnCashFlow, setAccessCashOnCashFlow] = useState(false)
  const [accessROI, setAccessROI] = useState(false)

  const {results} = useContext(PropertiesContext)

  const {loggedIn} = useContext(ProfileContext)

  const addToFavorites = (property) => {
    loggedIn === false 
      ? null 
      : addFavorite(property)
  }

  const formatStatus = (status) => {
    let currentStatus = status
    let formattedString = currentStatus.toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    return formattedString
  }

  return (
    <ScrollView style={styles.scroll}>
    {
      results.map((property) => {
        return(
          <View key={property.zpid} style={styles.property}>
            <TouchableOpacity onPress={() => {navigation.navigate('PropertyScreen', {zpid: property.zpid})}}> 
              <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.hiResImageLink}}/>
              <View style={styles.summary}>
                <View style={styles.background}></View>
                <View style={styles.favoriteMenu}>
                  {
                    favoritesZpids.includes(property.zpid)
                      ? <TouchableOpacity onPress={() => {removeFromFavorites(property)}}><Entypo color={'white'} size={28} name='heart'  stlye={styles.menu}/></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {addToFavorites(property)}}><Entypo color={'white'} size={28} name='heart-outlined'  stlye={styles.menu}/></TouchableOpacity>
                  }
                </View>
                <View>
                  <Text style={[styles.text, styles.price, styles.summaryInfo]}>${property.price}</Text>
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
                    {property.bedrooms} Beds | {property.bathrooms} Bath | {property.livingArea} Sqft.
                  </Text>
                  <Text style={styles.address}>
                    {formatStatus(property.homeStatus)}
                  </Text>
                </View>
              </View>
              <View style={styles.investmentComponent}>
                <View style={styles.column}> 
                  <View style={styles.metric}>
                    <View style={styles.key}>
                      <Text style={styles.metricText}>Monthly Rev.:</Text>
                      <TouchableOpacity onPress={() => {setAccessMonthlyRevenue(!accessMonthlyRevenue)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>${property.investment.monthlyRevenue}</Text>
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
                      <Text style={styles.metricText}>Monthly Exp.:</Text>
                      <TouchableOpacity onPress={() => {setAccessMonthlyExpenses(!accessMonthlyExpenses)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>${property.investment.expenses}</Text>
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
                      <Text style={styles.metricText}>Mortgage:</Text>
                      <TouchableOpacity  onPress={() => {setAccessMortgage(!accessMortgage)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>${property.investment.mortgageAmount}</Text>
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
                      <Text style={styles.metricText}>Cash Flow:</Text>
                      <TouchableOpacity onPress={() => {setAccessCashFlow(!accessCashFlow)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>${property.investment.monthlyCashFLow}</Text>
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
                      <Text style={styles.metricText}>Net Operating Income:</Text>
                      <TouchableOpacity onPress={() => {setAccessNOI(!accessNOI)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>${property.investment.netOperatingIncome}</Text>
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
                      <Text style={styles.metricText}>Cap Rate:</Text>
                      <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>{property.investment.currentCapRate}%</Text>
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
                      <Text style={styles.metricText}>CoC Return:</Text>
                      <TouchableOpacity onPress={() => {setAccessCashOnCashFlow(!accessCashOnCashFlow)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>{property.investment.currentCashOnCashReturn}%</Text>
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
                      <Text style={styles.metricText}>Return On Invesetment:</Text>
                      <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}} style={styles.infoCOntainer}>
                        <Text style={styles.info}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.metricText}>{property.investment.year1ReturnOnInvestment}%</Text>
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
              <View style={styles.hSplit}></View>
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimer}>Values & Metrics based on 20% down / 30 years / {property.mortgageRates.thirtyYearFixedRate}% IR</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })
    }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginLeft: 8,
    marginBottom: 250
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
  background: {
    position: 'absolute',
    height: aspectHeight,
    width: aspectWidth,
    backgroundColor: 'black',
    opacity: .4
  },
  favoriteMenu: {
    width: aspectWidth - 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryInfo: {
    marginTop: aspectHeight - 120
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
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  disclaimer: {
    color: 'grey'
  },
  metricText: {
    fontSize: 20,
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
  }
})

export default ResultsComponent