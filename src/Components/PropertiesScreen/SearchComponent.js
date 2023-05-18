import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import {Feather} from 'react-native-vector-icons'

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
    <View style={styles.SearchBar}>
      <View style={styles.search}>
        <Feather size={20} name='search'/>
        <TextInput
          style={styles.input}
          onChangeText={(value) => updateSearch(value)}
          value={currentSearch}
          placeholder='Los Angeles, CA'
        />
      </View>
      <TouchableOpacity onPress={() => {clearSearch()}}>
        <Text style={styles.SearchText}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  SearchBar: {
    width: '100%',
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginTop: 8,
    borderRadius: 6
  },
  search: {
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    width: '70%',
    fontSize: 20,
    marginLeft: 6
  },
  SearchText: {
    fontSize: 20,
  }
})

export default SearchComponent