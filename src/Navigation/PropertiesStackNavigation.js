import { createStackNavigator } from '@react-navigation/stack'

import PropertiesScreen from '../Screens/PropertiesScreen';
import PropertyScreen from '../Screens/PropertyScreen';
import OfferScreen from '../Screens/PropertyScreen/OfferScreen';

const StackNav = createStackNavigator();

const PropertyStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="PropertiesScreen" component={PropertiesScreen}/>
      <StackNav.Screen name="PropertyScreen" component={PropertyScreen}/>
      <StackNav.Screen name="OfferScreen" component={OfferScreen}/>
    </StackNav.Navigator>
  )
}

export default PropertyStackNavigation