import React, { useContext, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AnalysisContext } from '../Context/AnalysisContext'
import SearchComponent from '../Components/AnalysisComponent/SearchComponent'
import SummaryComponent from '../Components/AnalysisComponent/SummaryComponent'
import RentalRatesComponent from '../Components/AnalysisComponent/RentalRatesAirbnbComponent'
import RentalRatesAirbnbComponent from '../Components/AnalysisComponent/RentalRatesAirbnbComponent'
import RentalRatesTraditionalComponent from '../Components/AnalysisComponent/RentalRatesTraditionalComponent'
import TopRatedComponents from '../Components/AnalysisComponent/TopRatedComponents'
import NewlyListedComponent from '../Components/AnalysisComponent/NewlyListedComponent'

const MarketAnalysisScreen = () => {

  const {activeSearch, submitRequest} = useContext(AnalysisContext)

  useEffect(() => {
    submitRequest()
  },[])

  return (
    <View>
      <SearchComponent/>
      <ScrollView>
        <View>
          <Text>Market Analysis: {activeSearch}</Text>
        </View>
        <SummaryComponent />
        <RentalRatesAirbnbComponent />
        <RentalRatesTraditionalComponent />
        <Text>TOP PERFORMING LISTINGS</Text>
        <TopRatedComponents />
        <Text>NEWLY LISTED PROPERTIES</Text>
        <NewlyListedComponent />
      </ScrollView>
    </View>
  )
}

export default MarketAnalysisScreen