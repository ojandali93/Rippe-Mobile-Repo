import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { Text, View } from 'react-native'

const SaleHistoryComponent = () => {

  const {priceHistory} = useContext(PropertyContext)

  const showSaleHistory = () => {
    return(
      <View>
        {
          priceHistory.map((item, index) => {
            return(
              <View key={index}>
                <View>
                  <Text>
                    {item.date}
                  </Text>
                </View>
                <View>
                  <Text>
                    {item.event}
                  </Text>
                </View>
                <View>
                  <Text>
                    {item.price}
                  </Text>
                </View>
                <View>
                  <Text>
                    {(item.priceChangeRate * 100).toFixed(2)}
                  </Text>
                </View>
                <View>
                  <Text>
                    {item.source}
                  </Text>
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

  return (
    <View>
      <View>
        <Text>Price History</Text>
      </View>
      <View>
        {
          priceHistory.length > 0 ? showSaleHistory() : noSaleHistory()
        }
      </View>
    </View>
  )
}

export default SaleHistoryComponent