import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch } from 'react-native'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'

const FilterModalComponent = () => {

  const [accessFilter, setAccessFilter] = useState(false)

  const {isSingleFamily, isMultiFamily, isApartment, 
        isCondo, isManufactured, isTownhouse} = useContext(SearchFilterContext)

  const {setIsSingleFamily, setIsMultiFamily, setIsApartment, 
    setIsCondo, setIsManufactured, setIsTownhouse} = useContext(SearchFilterContext)

  const {setResults, getProperties} = useContext(PropertiesContext)

  const applyFilter = () => {
    setAccessFilter(!accessFilter)
    setResults([])
    getProperties()
  }

  return (
    <View>
      <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
        <Text>
          Filter
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={accessFilter}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setAccessFilter(!accessFilter);
      }}>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <View>
          <View>
            <Text>Single Family Home</Text>
            <Switch
              onValueChange={() => setIsSingleFamily(!isSingleFamily)}
              value={isSingleFamily}
            />
          </View>
          <View>
            <Text>Multi Family Home</Text>
            <Switch
              onValueChange={() => setIsMultiFamily(!isMultiFamily)}
              value={isMultiFamily}
            />
          </View>
          <View>
            <Text>Townhouse</Text>
            <Switch
              onValueChange={() => setIsTownhouse(!isTownhouse)}
              value={isTownhouse}
            />
          </View>
          <View>
            <Text>Apartment</Text>
            <Switch
              onValueChange={() => setIsApartment(!isApartment)}
              value={isApartment}
            />
          </View>
          <View>
            <Text>Condo</Text>
            <Switch
              onValueChange={() => setIsCondo(!isCondo)}
              value={isCondo}
            />
          </View>
          <View>
            <Text>Manufactured Home</Text>
            <Switch
              onValueChange={() => setIsManufactured(!isManufactured)}
              value={isManufactured}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {applyFilter()}}>
          <Text>Apply Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default FilterModalComponent