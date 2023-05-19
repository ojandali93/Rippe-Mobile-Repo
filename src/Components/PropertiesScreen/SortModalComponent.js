import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Switch } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Feather } from 'react-native-vector-icons'

import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'
import { sortOptions } from '../../Assets/SortObjects'

import {propertyPricing, hoaAmounts, sqftOptions} from '../../Assets/FilterObjects'

const SortModalComponent = () => {

  const [accessSort, setAccessSort] = useState(false)
  const [newSort, setNewSort] = useState(false)
  const [accessFilter, setAccessFilter] = useState(false)

  const {sort, setSort} = useContext(SearchFilterContext)

  const {setResults, getProperties} = useContext(PropertiesContext)

  const {isSingleFamily, isMultiFamily, isApartment, 
    isCondo, isManufactured, isTownhouse} = useContext(SearchFilterContext)

  const {setIsSingleFamily, setIsMultiFamily, setIsApartment, 
  setIsCondo, setIsManufactured, setIsTownhouse} = useContext(SearchFilterContext)

  const {beds, setBeds, baths, setBaths} = useContext(SearchFilterContext)
  const {priceMin, priceMax, setPriceMin, setPriceMax} = useContext(SearchFilterContext)
  const {sqftMin, sqftMax, setSqftMin, setSqftMax} = useContext(SearchFilterContext)
  const {maxHoa, setMaxHoa} = useContext(SearchFilterContext)

  const {hasPool, setHasPool} = useContext(SearchFilterContext)
  const {hasGarage, setHasGarage} = useContext(SearchFilterContext)
  const {hasAC, setHasAC} = useContext(SearchFilterContext)
  const {isSingleStory, setIsSingleStory} = useContext(SearchFilterContext)

  const {cityView, setCityView} = useContext(SearchFilterContext)
  const {mountainView, setMountainView} = useContext(SearchFilterContext)
  const {waterView, setWaterView} = useContext(SearchFilterContext)
  const {waterFront, setWaterFront} = useContext(SearchFilterContext)

  const applyFilter = () => {
  setAccessFilter(!accessFilter)
  setResults([])
  getProperties()
  }

  const updateSortPart = (selectedSort) => {
    setNewSort(true)
    setSort(selectedSort)
    setAccessSort(!accessSort)
  }

  const submitRequest = () => {
    setNewSort(false)
    setResults([])
    getProperties()
  }

  useEffect(() => {
    !accessSort
      ? !newSort
        ? null
        : submitRequest()
      : null
  }, [accessSort])

  return (
    <View>
      <View style={styles.sortFilterMenu}>
        <TouchableOpacity onPress={() => {setAccessSort(!accessSort)}}>
          <Text style={styles.modalButton}>
            Sort
          </Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
          <Text style={styles.modalButton}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={accessSort}>
          <View style={styles.sortContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>SORT</Text>
            </View>
            {
              sortOptions.map((item) => {
                return(
                  <TouchableOpacity style={styles.item} onPress={() => {updateSortPart(item.value)}}>
                    <Text style={styles.text}>{item.label}</Text>
                    {
                      sort === item.value ? <Feather size={20} name={'check'}/> : null
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <TouchableOpacity style={styles.closeContainer} onPress={() => {setAccessSort(!accessSort)}}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={accessFilter}
      >
        <ScrollView style={styles.filterContainer}>
          <View style={styles.headerContainer}>
              <Text style={styles.header}>Filter</Text>
            </View>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerText}>Property Types:</Text>
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Single Family Home</Text>
              <Switch
                onValueChange={() => setIsSingleFamily(!isSingleFamily)}
                value={isSingleFamily}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Multi Family Home</Text>
              <Switch
                onValueChange={() => setIsMultiFamily(!isMultiFamily)}
                value={isMultiFamily}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Townhouse</Text>
              <Switch
                onValueChange={() => setIsTownhouse(!isTownhouse)}
                value={isTownhouse}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Apartment</Text>
              <Switch
                onValueChange={() => setIsApartment(!isApartment)}
                value={isApartment}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Condo</Text>
              <Switch
                onValueChange={() => setIsCondo(!isCondo)}
                value={isCondo}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Manufactured Home</Text>
              <Switch
                onValueChange={() => setIsManufactured(!isManufactured)}
                value={isManufactured}
              />
            </View>
          </View>
          <View >
            <View style={styles.sectionHeader}>
              <Text style={styles.headerText}>Propert Details:</Text>
            </View>
            <View>
              <Text style={styles.detailSection}>Bedrooms</Text>
            </View>
            <View style={styles.roomSelection}>
              <TouchableOpacity onPress={() => {setBeds(0)}}>
                {
                  beds === 0 ? <Text style={styles.roomItemSelected}>Any</Text> : <Text style={styles.roomItem}>Any</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(1)}}>
                {
                  beds === 1 ? <Text style={styles.roomItemSelected}>1+</Text> : <Text style={styles.roomItem}>1+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(2)}}>
                {
                  beds === 2 ? <Text style={styles.roomItemSelected}>2+</Text> : <Text style={styles.roomItem}>2+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(3)}}>
                {
                  beds === 3 ? <Text style={styles.roomItemSelected}>3+</Text> : <Text style={styles.roomItem}>3+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(4)}}>
                {
                  beds === 4 ? <Text style={styles.roomItemSelected}>4+</Text> : <Text style={styles.roomItem}>4+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(5)}}>
                {
                  beds === 5 ? <Text style={styles.roomItemSelected}>5+</Text> : <Text style={styles.roomItem}>5+</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.detailSection}>Bathrooms</Text>
            </View>
            <View style={styles.roomSelection}>
              <TouchableOpacity onPress={() => {setBaths(0)}}>
                {
                  baths === 0 ? <Text style={styles.roomItemSelected}>Any</Text> : <Text style={styles.roomItem}>Any</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(1)}}>
                {
                  baths === 1 ? <Text style={styles.roomItemSelected}>1+</Text> : <Text style={styles.roomItem}>1+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(2)}}>
                {
                  baths === 2 ? <Text style={styles.roomItemSelected}>2+</Text> : <Text style={styles.roomItem}>2+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(3)}}>
                {
                  baths === 3 ? <Text style={styles.roomItemSelected}>3+</Text> : <Text style={styles.roomItem}>3+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(4)}}>
                {
                  baths === 4 ? <Text style={styles.roomItemSelected}>4+</Text> : <Text style={styles.roomItem}>4+</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(5)}}>
                {
                  baths === 5 ? <Text style={styles.roomItemSelected}>5+</Text> : <Text style={styles.roomItem}>5+</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailSection}>Price Min: </Text>
            </View>
            <RNPickerSelect 
              value={priceMin}
              onValueChange={(value) => setPriceMin(value)}
              items={propertyPricing}
              style={styles.detailInput}
            />
          </View>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailSection}>Price Max: </Text>
            </View>
            <RNPickerSelect 
              value={priceMax}
              onValueChange={(value) => setPriceMax(value)}
              items={propertyPricing}
              style={styles.detailInput}
            />
          </View>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailSection}>Max Hoa: </Text>
            </View>
            <RNPickerSelect 
              value={maxHoa}
              onValueChange={(value) => setMaxHoa(value)}
              items={hoaAmounts}
              style={styles.detailInput}
            />
          </View>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailSection}>Sqft Min: </Text>
            </View>
            <RNPickerSelect 
              value={sqftMin}
              onValueChange={(value) => setSqftMin(value)}
              items={sqftOptions}
              style={styles.detailInput}
            />
          </View>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailSection}>Sqft Max: </Text>
            </View>
            <RNPickerSelect 
              value={sqftMax}
              onValueChange={(value) => setSqftMax(value)}
              items={sqftOptions}
              style={styles.detailInput}
            />
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.headerText}>Amenities:</Text>
          </View>
          <View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Has Pool</Text>
              <Switch
                onValueChange={() => setHasPool(!hasPool)}
                value={hasPool}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Has Garage</Text>
              <Switch
                onValueChange={() => setHasGarage(!hasGarage)}
                value={hasGarage}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Has AC</Text>
              <Switch
                onValueChange={() => setHasAC(!hasAC)}
                value={hasAC}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Single Story</Text>
              <Switch
                onValueChange={() => setIsSingleStory(!isSingleStory)}
                value={isSingleStory}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Water Front</Text>
              <Switch
                onValueChange={() => setWaterFront(!waterFront)}
                value={waterFront}
              />
            </View>
          </View>
          <View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>City View</Text>
              <Switch
                onValueChange={() => setCityView(!cityView)}
                value={cityView}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Mountain View</Text>
              <Switch
                onValueChange={() => setMountainView(!mountainView)}
                value={mountainView}
              />
            </View>
            <View style={styles.propTypeContainer}>
              <Text style={styles.propTypeText}>Water View</Text>
              <Switch
                onValueChange={() => setWaterView(!waterView)}
                value={waterView}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.closeContainer} onPress={() => {applyFilter()}}>
            <Text style={styles.close}>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.closeContainer, {marginBottom: 26}]} onPress={() => {setAccessFilter(!accessFilter)}}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalButton: {
    fontSize: 18,
    color: 'blue',
  },
  sortFilterMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 8,
    width: 2,
    height: '100%',
    backgroundColor: 'grey'
  },
  header: {
    fontSize: 24,
    fontWeight: '600'
  }, 
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  sortContainer: {
    marginTop: 56,
    width: '100%',
  },
  filterContainer: {
    marginTop: 56,
    width: '100%',
    paddingHorizontal: 8
  },
  item: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  text: {
    fontSize: 18,
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  close: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18
  },
  sectionHeader: {
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    marginBottom: 8,
    backgroundColor: 'lightgrey',
    paddingLeft: 8
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600'
  },
  propTypeContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  propTypeText: {
    fontSize: 18
  },
  detailSection: {
    fontSize: 18
  },
  roomSelection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 16,
  },
  roomItem: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 14
  },
  roomItemSelected: {
    padding: 14, 
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'lightblue',
    color: 'black'
  },
  detailRow: {
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default SortModalComponent