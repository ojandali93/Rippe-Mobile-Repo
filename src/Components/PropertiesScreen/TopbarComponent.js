import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import SearchComponent from './SearchComponent'
import SortModalComponent from './SortModalComponent'
import FilterModalComponent from './FilterModalComponent'
import PageNavigatorComponent from './PageNavigatorComponent'

import { PropertiesContext } from '../../Context/PropertiesContext'
import { SearchFilterContext } from '../../Context/SearchFilterContext'

const deviceWidth = Dimensions.get('window').width
const aspectWidth = deviceWidth - 16
const splitWidth = deviceWidth - 16

const TopbarComponent = () => {

  const {viewMaps, setViewMaps} = useContext(PropertiesContext)
  const {activeSearch} = useContext(SearchFilterContext)

  return (
    <View style={styles.component}>
      <View style={styles.search}>
        <SearchComponent />
      </View>
      <View style={styles.split}></View>
      <View style={styles.sortFilterPage}>
        <View style={styles.sortFilter}>
          <SortModalComponent />
        </View>
        <View style={styles.mapView}>
          {
            viewMaps 
              ? <Text style={styles.button} onPress={() => {setViewMaps(!viewMaps)}}> List</Text>
              : <Text style={styles.button} onPress={() => {setViewMaps(!viewMaps)}}> Map</Text>
          }
        </View>
      </View>
      <View style={styles.split}></View>
      <View style={styles.bottomRow}>
        <Text style={styles.buttonText}>
          Results: "{activeSearch}"
        </Text>
        <PageNavigatorComponent />
      </View>
      <View style={styles.split}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    width: aspectWidth,
    marginLeft: 8
  },
  search: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  split: {
    height: 2,
    width: splitWidth,
    backgroundColor: 'grey',
    marginVertical: 8
  },
  sortFilterPage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sortFilter: {
    display: 'flex',
    flexDirection: 'row'
  },
  mapView: {
    display: 'flex',
    flexDirection: 'row'
  },
  verticalSplit: {
    width: 2,
    height: '100%',
    backgroundColor: 'grey'
  },
  button: {
    fontSize: 18,
    color: 'blue',
  },
  bottomRow: {
    height: 18,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default TopbarComponent