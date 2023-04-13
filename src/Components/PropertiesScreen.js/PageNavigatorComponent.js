import React, { useContext } from 'react'
import { PropertiesContext } from '../../Context/PropertiesContext'
import {View, Text, TouchableOpacity} from 'react-native'

const PageNavigatorComponent = () => {

  const {currentPage, setCurrentPage, 
          setResults, totalPages, getProperties} = useContext(PropertiesContext)
  let nextPage = currentPage + 1
  let prevPage = currentPage - 1

  const updateNextPage = () => {
    currentPage < totalPages
      ? submitNewRequest(nextPage)
      : null
  }

  const updatePreviousPage = () => {
    currentPage > 1
      ? submitNewRequest(prevPage)
      : null
  }

  const submitNewRequest = (newPage) => {
    setCurrentPage(newPage)
    setResults([])
    getProperties()
  }

  return (
    <View>
      <TouchableOpacity onPress={() => {updatePreviousPage()}}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      {
        currentPage > 1 
          ? <Text>{prevPage}</Text>
          : null
      }
      <Text>{currentPage}</Text>
      {
        currentPage < totalPages
          ? <Text>{nextPage}</Text>
          : null
      }
      <TouchableOpacity onPress={() => {updateNextPage()}}>
      <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PageNavigatorComponent