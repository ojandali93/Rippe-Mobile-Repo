import React, { useContext, useEffect } from 'react'
import {Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { useNavigation } from '@react-navigation/native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const aspectHeight = (deviceWidth / 1.78) + 1

const ResultsComponent = () => {
  const navigation = useNavigation()

  const {results} = useContext(PropertiesContext)
  const {setProperty, setPropertyDetails} = useContext(PropertyContext)

  const goToPropertyPage = (property) => {
    setProperty(property)
    navigation.navigate('PropertyScreen')
  }

  return (
    <ScrollView>
    {
      results.map((property) => {
        return(
          <View key={property.zpid}>
            <TouchableOpacity onPress={() => {goToPropertyPage(property)}}> 
              <Image style={{height: aspectHeight, width: aspectWidth}} source={{uri: property.hiResImageLink}}/>
              <View>
                <View>
                  <Text>{property.price}</Text>
                  <Text>{property.homeStatus}</Text>
                </View>
                <View>
                  <Text>
                    {property.streetAddress}
                  </Text>
                  <Text>
                    {property.city}, {property.state} {property.zipcode}
                  </Text>
                </View>
                <View>
                  <Text>
                    {property.bedrooms} Beds | {property.bathrooms} Bath | {property.livingArea} Sqft.
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>Monthly Expenses: {property.investment.expenses}</Text>
                </View>
                <View>
                  <Text>Monthly Revenue: {property.investment.monthlyRevenue}</Text>
                </View>
                <View>
                  <Text>Net Operating Income: {property.investment.netOperatingIncome}</Text>
                </View>
                <View>
                  <Text>Cash Flow: {property.investment.monthlyCashFLow}</Text>
                </View>
                <View>
                  <Text>Cash on Cash Return: {property.investment.currentCashOnCashReturn}</Text>
                </View>
                <View>
                  <Text>Cap Rate: {property.investment.currentCapRate}</Text>
                </View>
                <View>
                  <Text>Year 1 ROI: {property.investment.year1ReturnOnInvestment}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      })
    }
    </ScrollView>
  )
}

export default ResultsComponent