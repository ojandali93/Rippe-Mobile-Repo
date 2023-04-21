import React, { useContext, useEffect } from 'react'
import {View, Text, TextInput} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const AdditionalExpensesComponent = () => {

  const {otherExpenses, setOtherExpenses} = useContext(PropertyContext)
  const {maintenance, setMaintenance} = useContext(PropertyContext)
  const {management, setManagement} = useContext(PropertyContext)
  const {repairs, setRepairs} = useContext(PropertyContext)
  const {homeWarranty, setHomeWarranty} = useContext(PropertyContext)
  const {other, setOther} = useContext(PropertyContext)

  useEffect(() => {
    setOtherExpenses(parseInt(maintenance) + parseInt(management) + 
      parseInt(repairs) + parseInt(homeWarranty) + parseInt(other))
  }, [maintenance, management, repairs, homeWarranty, other])

  return (
    <View>
      <View>
        <Text>
          Other Expenses: {parseInt(otherExpenses)}
        </Text>
      </View>
      <View>
        <Text>
          maintenance {'(Annual)'}: {parseInt(maintenance)}
        </Text>
        <TextInput
          value={maintenance.toString()}
          onChangeText={(value) => setMaintenance(value)}
        />
      </View>

      <View>
        <Text>
          Management {'(Annual)'}: {parseInt(management)}
        </Text>
        <TextInput
          value={management.toString()}
          onChangeText={(value) => setManagement(value)}
        />
      </View>
      <View>
        <Text>
          Repairs {'(Annual)'}: {parseInt(repairs)}
        </Text>
        <TextInput
          value={repairs.toString()}
          onChangeText={(value) => setRepairs(value)}
        />
      </View>
      <View>
        <Text>
          Home Warranty {'(Annual)'}: {parseInt(homeWarranty)}
        </Text>
        <TextInput
          value={homeWarranty.toString()}
          onChangeText={(value) => setHomeWarranty(value)}
        />
      </View>
      <View>
        <Text>
          Other {'(Annual)'}: {parseInt(other)}
        </Text>
        <TextInput
          value={other.toString()}
          onChangeText={(value) => setOther(value)}
        />
      </View>
    </View>
  )
}

export default AdditionalExpensesComponent