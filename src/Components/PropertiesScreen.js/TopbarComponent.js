import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import SearchComponent from './SearchComponent'
import SortModalComponent from './SortModalComponent'
import FilterModalComponent from './FilterModalComponent'
import { PropertiesContext } from '../../Context/PropertiesContext'

const TopbarComponent = () => {

  const {viewMaps, setViewMaps} = useContext(PropertiesContext)

  return (
    <View>
      <SearchComponent />
      <SortModalComponent />
      <FilterModalComponent />
      <View>
        <Text onPress={() => {setViewMaps(!viewMaps)}}>
          Switch View
        </Text>
      </View>
    </View>
  )
}

export default TopbarComponent