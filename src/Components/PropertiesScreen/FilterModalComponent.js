import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch, ScrollView } from 'react-native'


import { SearchFilterContext } from '../../Context/SearchFilterContext'
import { PropertiesContext } from '../../Context/PropertiesContext'
import {Picker} from '@react-native-picker/picker';
import {propertyPricing, hoaAmounts, sqftOptions} from '../../Assets/FilterObjects'

const FilterModalComponent = () => {

  const [accessFilter, setAccessFilter] = useState(false)

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

  const {setResults, getProperties} = useContext(PropertiesContext)

  const applyFilter = () => {
    setAccessFilter(!accessFilter)
    setResults([])
    getProperties()
  }

  return (
    <View>
      <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
      <Text style={styles.modalButton}>
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
        <ScrollView>
          <Text>Hello</Text>
          <Text>Hello</Text>
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
          <View>
            <View>
              <Text>Bedrooms</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {setBeds(0)}}>
                <Text>Any</Text>
                {
                  beds === 0 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(1)}}>
                <Text>1+</Text>
                {
                  beds === 1 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(2)}}>
                <Text>2+</Text>
                {
                  beds === 2 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(3)}}>
                <Text>3+</Text>
                {
                  beds === 3 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(4)}}>
                <Text>4+</Text>
                {
                  beds === 4 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBeds(5)}}>
                <Text>5+</Text>
                {
                  beds === 5 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <Text>Bathrooms</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {setBaths(0)}}>
                <Text>Any</Text>
                {
                  baths === 0 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(1)}}>
                <Text>1+</Text>
                {
                  baths === 1 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(2)}}>
                <Text>2+</Text>
                {
                  baths === 2 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(3)}}>
                <Text>3+</Text>
                {
                  baths === 3 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(4)}}>
                <Text>4+</Text>
                {
                  baths === 4 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setBaths(5)}}>
                <Text>5+</Text>
                {
                  baths === 5 ? <Text>clicked</Text> : null
                }
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <Text>Price Min - </Text>
            </View>
            <Picker 
              selectedValue={priceMin}
              onValueChange={(value) => setPriceMin(value)}
            >
              {
                propertyPricing.map((item) => {
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
                })
              }
            </Picker>
          </View>
          <View>
            <View>
              <Text>Price Max - </Text>
            </View>
            <Picker 
              selectedValue={priceMax}
              onValueChange={(value) => setPriceMax(value)}
            >
              {
                propertyPricing.map((item) => {
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
                })
              }
            </Picker>
          </View>
          <View>
            <View>
              <Text>Max Hoa - </Text>
            </View>
            <Picker 
              selectedValue={maxHoa}
              onValueChange={(value) => setMaxHoa(value)}
            >
              {
                hoaAmounts.map((item) => {
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
                })
              }
            </Picker>
          </View>
          <View>
            <View>
              <Text>Sqft Min - </Text>
            </View>
            <Picker 
              selectedValue={sqftMin}
              onValueChange={(value) => setSqftMin(value)}
            >
              {
                sqftOptions.map((item) => {
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
                })
              }
            </Picker>
          </View>
          <View>
            <View>
              <Text>Sqft Max - </Text>
            </View>
            <Picker 
              selectedValue={sqftMax}
              onValueChange={(value) => setSqftMax(value)}
            >
              {
                sqftOptions.map((item) => {
                  return(
                    <Picker.Item label={item.label} value={item.value} />
                  )
                })
              }
            </Picker>
          </View>
          <View>
            <View>
              <Text>Has Pool</Text>
              <Switch
                onValueChange={() => setHasPool(!hasPool)}
                value={hasPool}
              />
            </View>
            <View>
              <Text>Has Garage</Text>
              <Switch
                onValueChange={() => setHasGarage(!hasGarage)}
                value={hasGarage}
              />
            </View>
            <View>
              <Text>Has AC</Text>
              <Switch
                onValueChange={() => setHasAC(!hasAC)}
                value={hasAC}
              />
            </View>
            <View>
              <Text>Single Story</Text>
              <Switch
                onValueChange={() => setIsSingleStory(!isSingleStory)}
                value={isSingleStory}
              />
            </View>
            <View>
              <Text>Water Front</Text>
              <Switch
                onValueChange={() => setWaterFront(!waterFront)}
                value={waterFront}
              />
            </View>
          </View>
          <View>
            <View>
              <Text>City View</Text>
              <Switch
                onValueChange={() => setCityView(!cityView)}
                value={cityView}
              />
            </View>
            <View>
              <Text>Mountain View</Text>
              <Switch
                onValueChange={() => setMountainView(!mountainView)}
                value={mountainView}
              />
            </View>
            <View>
              <Text>Water View</Text>
              <Switch
                onValueChange={() => setWaterView(!waterView)}
                value={waterView}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {applyFilter()}}>
            <Text>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setAccessFilter(!accessFilter)}}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalButton: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: 'blue'
  }
})

export default FilterModalComponent


