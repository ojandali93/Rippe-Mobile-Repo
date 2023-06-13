import React, { useContext } from 'react'
import { PropertiesContext } from '../../Context/PropertiesContext'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {updatePreviousPage()}}>
        <Text style={styles.signalLeft}>{'<'}</Text>
      </TouchableOpacity>
      {
        currentPage > 1 
          ? <Text style={styles.text}>{prevPage}</Text>
          : null
      }
      <Text  style={styles.currentPage}>{currentPage}</Text>
      {
        currentPage < totalPages
          ? <Text style={styles.text}>{nextPage}</Text>
          : null
      }
      <TouchableOpacity onPress={() => {updateNextPage()}}>
        <Text style={styles.signalRight}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 4
  },
  signalLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6
  },
  signalRight: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6
  },
  currentPage: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default PageNavigatorComponent