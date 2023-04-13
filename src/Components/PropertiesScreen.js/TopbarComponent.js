import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import SearchComponent from './SearchComponent'
import SortModalComponent from './SortModalComponent'
import FilterModalComponent from './FilterModalComponent'
import { PropertiesContext } from '../../Context/PropertiesContext'
import PageNavigatorComponent from './PageNavigatorComponent'

const TopbarComponent = () => {

  const {viewMaps, setViewMaps} = useContext(PropertiesContext)

  return (
    <View>
      <SearchComponent />
      <SortModalComponent />
      <FilterModalComponent />
      <PageNavigatorComponent />
      <View>
        <Text onPress={() => {setViewMaps(!viewMaps)}}>
          Switch View
        </Text>
      </View>
    </View>
  )
}

export default TopbarComponent