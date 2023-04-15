import { createStackNavigator } from '@react-navigation/stack'

import PropertiesScreen from '../Screens/PropertiesScreen';
import PropertyScreen from '../Screens/PropertyScreen';

const StackNav = createStackNavigator();

const PropertyStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="PropertiesScreen" component={PropertiesScreen}/>
      <StackNav.Screen name="PropertyScreen" component={PropertyScreen}/>
    </StackNav.Navigator>
  )
}

export default PropertyStackNavigation