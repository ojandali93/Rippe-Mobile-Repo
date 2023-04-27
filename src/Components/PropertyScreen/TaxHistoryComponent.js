import React, { useContext } from 'react'
import { PropertyContext } from '../../Context/PropertyContext'
import { View, Text } from 'react-native'

const TaxHistoryComponent = () => {

  const {taxHistory} = useContext(PropertyContext)

  const showTaxHistory = () => {
    return(
      <View>
        {
          taxHistory.slice(0, 10).map((item, index) => {
            return(
              <View key={index}>
                <View>
                  <Text>
                    Tax Paid: {item.taxPaid}
                  </Text>
                </View>
                <View>
                  <Text>
                    Tax Increase Rate: {(item.taxIncreaseRate * 100).toFixed(2)}
                  </Text>
                </View>
                <View>
                  <Text>
                    Value: {item.value}
                  </Text>
                </View>
                <View>
                  <Text>
                    Value Increase Rate: {(item.valueIncreaseRate * 100).toFixed(2)}
                  </Text>
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

  return (
    <View>
      <View>
        <Text>Tax History</Text>
      </View>
      <View>
        {
          taxHistory.length > 0 ? showTaxHistory() : noTaxHistory()
        }
      </View>
    </View>
  )
}

export default TaxHistoryComponent