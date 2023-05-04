import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../Screens/FavoritesScreens/LoginScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import SignupScreen from '../Screens/FavoritesScreens/SignupScreen';

const StackNav = createStackNavigator();

const FavoriteStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen}/>
      <StackNav.Screen name="LoginFavoritesScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupFavoritesScreen" component={SignupScreen}/>
    </StackNav.Navigator>
  )
}

export default FavoriteStackNavigation