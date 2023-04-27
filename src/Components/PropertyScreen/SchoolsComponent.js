import React, { useContext } from 'react'
import { View, Text} from 'react-native'
import { PropertyContext } from '../../Context/PropertyContext'

const SchoolsComponent = () => {

  const {schools} = useContext(PropertyContext)

  return (
    <View>
      <View>
        <Text>Schools</Text>
      </View>
      <View>
        {
          schools.map((item) => {
            return(
              <View>
                <View>
                  <Text>
                    Name: {item.name}
                  </Text> 
                </View>
                <View>
                  <Text>
                    Level: {item.level}
                  </Text>
                </View>
                <View>
                  <Text>
                    Grades: {item.grades}
                  </Text>
                </View>
                <View>
                  <Text>
                    Distance: {item.distance}
                  </Text>
                </View>
                <View>
                  <Text>
                    Rating: {item.rating}
                  </Text>
                </View>
                <View>
                  <Text>
                    Type: {item.type}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default SchoolsComponent