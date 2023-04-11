import React from 'react'
import { View } from 'react-native'

import SearchComponent from './SearchComponent'
import SortModalComponent from './SortModalComponent'
import FilterModalComponent from './FilterModalComponent'

const TopbarComponent = () => {
  return (
    <View>
      <SearchComponent />
      <SortModalComponent />
      <FilterModalComponent />
    </View>
  )
}

export default TopbarComponent