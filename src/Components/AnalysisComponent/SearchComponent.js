import React, { useContext } from 'react'
import { AnalysisContext } from '../../Context/AnalysisContext'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const SearchComponent = () => {

  const {setCurrentSearch, currentSearch} = useContext(AnalysisContext)
  const {submitRequest} = useContext(AnalysisContext)

  return (
    <View>
      <View>
        <TextInput
          placeholder='Enter City, State'
          value={currentSearch}
          onChangeText={(value) => {setCurrentSearch(value)}}
        />
        <TouchableOpacity onPress={() => {submitRequest()}}>
          <Text>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchComponent