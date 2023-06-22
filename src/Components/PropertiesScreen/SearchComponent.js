import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import {Feather} from 'react-native-vector-icons'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'

const SearchComponent = () => {

  const [newSearch, setNewSearch] = useState(false)
  const [search, setSearch] = useState('')

  const {currentSearch, setCurrentSearch, setSubmitNewSearch} = useContext(PropertiesContext)
  const {setResults, getProperties} = useContext(PropertiesContext)

  const SubmitSearch = () => {
    setSubmitNewSearch(true)
    setNewSearch(true)
    setCurrentSearch(search)
    setResults([])
    getProperties()
  }

  return (
    <View style={styles.SearchBar}>
      <View style={styles.search}>
        <Feather size={20} name='search'/>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setSearch(value)}
          value={search}
          placeholder='Los Angeles, CA'
        />
      </View>
      <TouchableOpacity onPress={() => {SubmitSearch()}}>
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
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8
  },
  input: {
    width: '90%',
    fontSize: 18,
    marginLeft: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  SearchText: {
    fontSize: 20,
    color: '#0039a6'
  }
})

export default SearchComponent