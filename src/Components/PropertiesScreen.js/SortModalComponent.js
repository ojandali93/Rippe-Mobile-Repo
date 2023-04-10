import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'

const SortModalComponent = () => {

  const [accessSort, setAccessSort] = useState(false)

  const {sort, setSort} = useContext(SearchFilterContext)
  const {setResults, getProperties} = useContext(PropertiesContext)

  const updateSort = (sort) => {
    setSort(sort)
  }

  useEffect(() => {
    setResults([])
    setAccessSort(!accessSort)
    getProperties()
  }, [sort])

  return (
    <View>
      <TouchableOpacity onPress={() => {setAccessSort(!accessSort)}}>
        <Text>
          Sort
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={accessSort}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          accessSort(!accessSort);
        }}>
          <View>
            <TouchableOpacity onPress={() => {updateSort('priorityscore')}}>
              <Text>
                Newest
              </Text>
              <View>
                {
                  sort === 'priorityscore' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('globalrelevanceex')}}>
              <Text>
                Recommended
              </Text>
              <View>
                {
                  sort === 'globalrelevanceex' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('featured')}}>
              <Text>
                Featured
              </Text>
              <View>
                {
                  sort === 'featured' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('pricea')}}>
              <Text>
                Price (Low to Hight)
              </Text>
              <View>
                {
                  sort === 'pricea' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('priced')}}>
              <Text>
                Price (High to Low)
              </Text>
              <View>
                {
                  sort === 'priced' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('paymenta')}}>
              <Text>
                Payment (Low to Hight)
              </Text>
              <View>
                {
                  sort === 'paymenta' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('paymentd')}}>
              <Text>
                Payment (High to Low)
              </Text>
              <View>
                {
                  sort === 'paymentd' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('beds')}}>
              <Text>
                Beds
              </Text>
              <View>
                {
                  sort === 'beds' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('baths')}}>
              <Text>
                Baths
              </Text>
              <View>
                {
                  sort === 'baths' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('size')}}>
              <Text>
                Sqft
              </Text>
              <View>
                {
                  sort === 'size' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateSort('lot')}}>
              <Text>
                Lot Size
              </Text>
              <View>
                {
                  sort === 'lot' ? <Text>Clicked</Text> : null
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setAccessSort(!accessSort)}}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    </View>
  )
}

export default SortModalComponent