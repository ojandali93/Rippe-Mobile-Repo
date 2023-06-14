import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const SaleHistoryComponent = () => {

  const {property} = useContext(PropertyContext)

  const showSaleHistory = () => {
    return(
      <View>
        <View style={styles.item}>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>
                Event
              </Text>
            </View>
            <View style={styles.centerColumn}>
              <Text style={styles.label}>
                Date
              </Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>
                Price
              </Text>
            </View>
          </View>
        </View>
        {
          property.priceHistory.slice(0, 10).map((item, index) => {
            return(
              <View style={styles.item} key={index}>
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.text}>
                      {item.event}
                    </Text>
                  </View>
                  <View style={styles.centerColumn}>
                    <Text style={styles.text}>
                      {item.date}
                    </Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.text}>
                      {item.price} 
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.text}>
                      source: {item.source}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.text}>
                      {(item.priceChangeRate * 100).toFixed(2)}% 
                    </Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  const noSaleHistory = () => {
    return(
      <View>
        <Text>No Sale Hisotry Found</Text>
      </View>
    )
  }

  const displayPhone = () => {
    return(
      <View style={styles.listingContainer}>
        <View style={styles.agentContainer}>
          {
            property.priceHistory.length > 0 ? showSaleHistory() : noSaleHistory()
          }
        </View>
      </View>
    )
  }

  const displayTablet = () => {
    return(
      <View style={styles.listingContainerTablet}>
        <View style={styles.agentContainer}>
          {
            property.priceHistory.length > 0 ? showSaleHistory() : noSaleHistory()
          }
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
  listingContainer: {
    width: aspectWidth,
    marginLeft: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  listingContainerTablet: {
    width: aspectWidthTablet,
    marginLeft: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  agentContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems:'center'
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightColumn: {
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  label: {
    fontSize: 18,
    fontWeight: '600'
  },
  text: {
    fontSize: 18
  },
})

export default SaleHistoryComponent