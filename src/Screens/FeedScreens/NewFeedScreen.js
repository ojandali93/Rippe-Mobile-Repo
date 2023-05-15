import React, { useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native'
import { FeedContext } from '../../Context/FeedContext'

import RNPickerSelect from 'react-native-picker-select'

import { propertyPricing, hoaAmounts, sqftOptions, homeStatus } from '../../Assets/FilterObjects'

const NewFeedScreen = () => {


  const {isSingleFamily, isMultiFamily, isApartment, 
    isCondo, isManufactured, isTownhouse} = useContext(FeedContext)

  const {setIsSingleFamily, setIsMultiFamily, setIsApartment, 
  setIsCondo, setIsManufactured, setIsTownhouse} = useContext(FeedContext)

  const {beds, setBeds, baths, setBaths} = useContext(FeedContext)
  const {priceMin, priceMax, setPriceMin, setPriceMax} = useContext(FeedContext)
  const {sqftMin, sqftMax, setSqftMin, setSqftMax} = useContext(FeedContext)
  const {maxHoa, setMaxHoa} = useContext(FeedContext)

  const {hasPool, setHasPool} = useContext(FeedContext)
  const {hasGarage, setHasGarage} = useContext(FeedContext)
  const {hasAC, setHasAC} = useContext(FeedContext)
  const {isSingleStory, setIsSingleStory} = useContext(FeedContext)

  const {cityView, setCityView} = useContext(FeedContext)
  const {mountainView, setMountainView} = useContext(FeedContext)
  const {waterView, setWaterView} = useContext(FeedContext)
  const {waterFront, setWaterFront} = useContext(FeedContext)
  const {location, setLocation} = useContext(FeedContext)
  const {status, setStatus} = useContext(FeedContext)

  const {addNewSearch} = useContext(FeedContext)

  return (
    <View>
      <Text>Add a new feed to watch</Text>
      <View>
        <Text>Enter City, State:</Text>
        <TextInput 
          placeholder='Los Angeles, CA'
          value={location}
          onChangeText={value => setLocation(value)}/>
      </View>
      <View>
        <Text>Refine your search:</Text>
      </View>
      <ScrollView style={{height: 600}}>
          <View>
            <RNPickerSelect 
              value={status}
              onValueChange={(value) => setStatus(value)}
              items={homeStatus}
            />
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
            <RNPickerSelect 
              value={priceMin}
              onValueChange={(value) => setPriceMin(value)}
              items={propertyPricing}
            />
          </View>
          <View>
            <View>
              <Text>Price Max - </Text>
            </View>
            <RNPickerSelect 
              value={priceMax}
              onValueChange={(value) => setPriceMax(value)}
              items={propertyPricing}
            />
          </View>
          <View>
            <View>
              <Text>Max Hoa - </Text>
            </View>
            <RNPickerSelect 
              value={maxHoa}
              onValueChange={(value) => setMaxHoa(value)}
              items={hoaAmounts}
            />
          </View>
          <View>
            <View>
              <Text>Sqft Min - </Text>
            </View>
            <RNPickerSelect 
              value={sqftMin}
              onValueChange={(value) => setSqftMin(value)}
              items={sqftOptions}
            />
          </View>
          <View>
            <View>
              <Text>Sqft Max - </Text>
            </View>
            <RNPickerSelect 
              value={sqftMax}
              onValueChange={(value) => setSqftMax(value)}
              items={sqftOptions}
            />
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
        </ScrollView>
        <TouchableOpacity onPress={() => {addNewSearch()}}>
          <Text>Add Search To Feed</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NewFeedScreen