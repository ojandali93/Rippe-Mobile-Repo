import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import SortModalComponent from './SortModalComponent'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'

const SearchComponent = () => {

  const {currentSearch, setCurrentSearch} = useContext(SearchFilterContext)
  const {sort, setSort} = useContext(SearchFilterContext)
  const {setResults, getProperties} = useContext(PropertiesContext)

  const clearSearch = () => {
    setResults([])
    getProperties()
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setCurrentSearch}
          value={currentSearch}
        />
      </View>
      <TouchableOpacity onPress={() => {clearSearch()}}>
        <Text>
          Search
        </Text>
      </TouchableOpacity>
      <SortModalComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 300
  }
})

export default SearchComponent