import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceWidthTablet = 425
const aspectWidth = deviceWidth - 16
const aspectWidthTablet = deviceWidthTablet - 16

const TaxHistoryComponent = () => {

  const {property} = useContext(PropertyContext)

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return(formattedDate)
  }

  const showTaxHistory = () => {
    return(
      <View>
        <View style={styles.item}>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>
                Date
              </Text>
            </View>
            <View style={styles.centerColumn}>
              <Text style={styles.label}>
                Value
              </Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>
                Taxes Paid
              </Text>
            </View>
          </View>
        </View>
        {
          property.taxHistory.slice(0, 10).map((item, index) => {
            return(
              <View style={styles.item} key={index}>
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.text}>
                      {convertTime(item.time)}
                    </Text>
                  </View>
                  <View style={styles.centerColumn}>
                    <Text style={styles.text}>
                      {item.value}
                    </Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.text}>
                      {item.taxPaid} 
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                  </View>
                  <View style={styles.centerColumn}>
                    <Text style={styles.text}>
                      {item.valueIncreaseRate.toFixed(2)}%
                    </Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.text}>
                      {item.taxIncreaseRate.toFixed(2)}%
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

  const noTaxHistory = () => {
    return(
      <View>
        <Text>No Tax Hisotry Found</Text>
      </View>
    )
  }

  const displayPhone = () => {
    return(
      <View style={styles.listingContainer}>
        <View style={styles.agentContainer}>
          {
            property.priceHistory.length > 0 ? showTaxHistory() : noTaxHistory()
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
            property.priceHistory.length > 0 ? showTaxHistory() : noTaxHistory()
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
    justifyContent: 'space-between',
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

export default TaxHistoryComponent