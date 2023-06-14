import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const DetailsComponent = () => {

  const {property} = useContext(PropertyContext)

  const displayPhone = () => {
    return(
      <View style={styles.detailsContainer}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>
              City: 
            </Text>
            <Text style={styles.text}>
              {property.city}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Beds: 
            </Text>
            <Text style={styles.text}>
              {property.bedrooms}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Year Built: 
            </Text>
            <Text style={styles.text}>
              {property.yearBuilt}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Living Area:
            </Text>
            <Text style={styles.text}>
              {property.livingAreaValue} {property.livingAreaUnitsShort}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Type:
            </Text>
            <Text style={styles.text}>
              {property.propertyTypeDimension}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Move In Ready: 
            </Text>
            <Text style={styles.text}>
            {
              property.moveInReady ? <Text>Yes</Text> : <Text>No</Text>
            }
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Garage Spaces:
            </Text>
            <Text style={styles.text}>
            {property.resoFacts.garageSpaces}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Has HOA: 
            </Text>
            <Text style={styles.text}>
            {
              property.monthlyHoaFee === null ? <Text>No</Text> : <Text>Yes</Text>
            }
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Parcel #:
            </Text>
            <Text style={styles.text}>
              {property.parcelId}
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.main}>
            <View style={styles.row}>
              <Text style={styles.text}>
              State:
              </Text>
              <Text style={styles.text}>
                {property.state}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Baths: 
              </Text>
              <Text style={styles.text}>
              {property.bathrooms}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Days Listed:
              </Text>
              <Text style={styles.text}>
              {property.yearBuilt}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Lot Area:
              </Text>
              <Text style={styles.text}>
              {property.lotAreaValue}
              {
                property.lotAreaUnits === 'Square Feet' ? <Text> Sqft.</Text> : <Text>{property.lotAreaUnits}</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Architecture:
              </Text>
              <Text style={styles.text}>
              {property.resoFacts.architecturalStyle}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Levels:
              </Text>
              <Text style={styles.text}>
              {
                property.resoFacts.levels === null ? <Text>Unknown</Text> : <Text>{property.resoFacts.levels}</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Includes Pool:
              </Text>
              <Text style={styles.text}>
              {
                property.resoFacts.hasPrivatePool ? <Text>Yes</Text> : <Text>No</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              HOA Fee:
              </Text>
              <Text style={styles.text}>
              {
                property.monthlyHoaFee ? <Text>{property.monthlyHoaFee}</Text> : <Text>$0</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              MLS Id:
              </Text>
              <Text style={styles.text}>
              {property.mlsid}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.detailsContainerTablet}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>
              City: 
            </Text>
            <Text style={styles.text}>
              {property.city}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Beds: 
            </Text>
            <Text style={styles.text}>
              {property.bedrooms}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Year Built: 
            </Text>
            <Text style={styles.text}>
              {property.yearBuilt}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Living Area:
            </Text>
            <Text style={styles.text}>
              {property.livingAreaValue} {property.livingAreaUnitsShort}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Type:
            </Text>
            <Text style={styles.text}>
              {property.propertyTypeDimension}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Move In Ready: 
            </Text>
            <Text style={styles.text}>
            {
              property.moveInReady ? <Text>Yes</Text> : <Text>No</Text>
            }
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Garage Spaces:
            </Text>
            <Text style={styles.text}>
            {property.resoFacts.garageSpaces}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Has HOA: 
            </Text>
            <Text style={styles.text}>
            {
              property.monthlyHoaFee === null ? <Text>No</Text> : <Text>Yes</Text>
            }
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
            Parcel #:
            </Text>
            <Text style={styles.text}>
              {property.parcelId}
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.main}>
            <View style={styles.row}>
              <Text style={styles.text}>
              State:
              </Text>
              <Text style={styles.text}>
                {property.state}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Baths: 
              </Text>
              <Text style={styles.text}>
              {property.bathrooms}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Days Listed:
              </Text>
              <Text style={styles.text}>
              {property.yearBuilt}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Lot Area:
              </Text>
              <Text style={styles.text}>
              {property.lotAreaValue}
              {
                property.lotAreaUnits === 'Square Feet' ? <Text> Sqft.</Text> : <Text>{property.lotAreaUnits}</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Architecture:
              </Text>
              <Text style={styles.text}>
              {property.resoFacts.architecturalStyle}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Levels:
              </Text>
              <Text style={styles.text}>
              {
                property.resoFacts.levels === null ? <Text>Unknown</Text> : <Text>{property.resoFacts.levels}</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              Includes Pool:
              </Text>
              <Text style={styles.text}>
              {
                property.resoFacts.hasPrivatePool ? <Text>Yes</Text> : <Text>No</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              HOA Fee:
              </Text>
              <Text style={styles.text}>
              {
                property.monthlyHoaFee ? <Text>{property.monthlyHoaFee}</Text> : <Text>$0</Text>
              }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
              MLS Id:
              </Text>
              <Text style={styles.text}>
              {property.mlsid}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    width: aspectWidth,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsContainerTablet: {
    width: aspectWidthTablet,
    marginLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    width: '49%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  text: {
    fontSize: 18,
    fontWeight: 500
  }
})

export default DetailsComponent