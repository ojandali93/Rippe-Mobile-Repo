import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import SortModalComponent from './SortModalComponent'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'

const SearchComponent = () => {

  const {currentSearch, setCurrentSearch} = useContext(SearchFilterContext)
  const {setActiveSearch} = useContext(SearchFilterContext)
  const {setResults, getProperties} = useContext(PropertiesContext)

  const clearSearch = () => {
    setActiveSearch(currentSearch)
    setResults([])
    getProperties()
  }

  const updateSearch = (value) => {
    setCurrentSearch(value)
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(value) => updateSearch(value)}
          value={currentSearch}
        />
      </View>
      <TouchableOpacity onPress={() => {clearSearch()}}>
        <Text>
          Search
        </Text>
      </TouchableOpacity>
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