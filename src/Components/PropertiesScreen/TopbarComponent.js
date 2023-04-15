import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import SearchComponent from './SearchComponent'
import SortModalComponent from './SortModalComponent'
import FilterModalComponent from './FilterModalComponent'
import PageNavigatorComponent from './PageNavigatorComponent'

import { PropertiesContext } from '../../Context/PropertiesContext'
import { SearchFilterContext } from '../../Context/SearchFilterContext'

const TopbarComponent = () => {

  const {viewMaps, setViewMaps} = useContext(PropertiesContext)
  const {activeSearch} = useContext(SearchFilterContext)

  return (
    <View>
      <SearchComponent />
      <SortModalComponent />
      <FilterModalComponent />
      <PageNavigatorComponent />
      <View>
        <Text>
          {activeSearch}
        </Text>
      </View>
      <View>
        <Text onPress={() => {setViewMaps(!viewMaps)}}>
          Switch View
        </Text>
      </View>
    </View>
  )
}

export default TopbarComponent