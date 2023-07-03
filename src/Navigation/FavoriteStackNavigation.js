import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/FavoritesScreens/LoginScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import SignupScreen from '../Screens/FavoritesScreens/SignupScreen';
import PropertyScreen from '../Screens/FavoritesScreens/PropertyScreen';

const StackNav = createStackNavigator();

const FavoriteStackNavigation = () => {
  return (
    <StackNav.Navigator initialRouteName='FavoritesScreen' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen}/>
      <StackNav.Screen name="LoginFavoritesScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupFavoritesScreen" component={SignupScreen}/>
      <StackNav.Screen name="PropertyFavoriteScreen" component={PropertyScreen}/>
    </StackNav.Navigator>
  )
}

export default FavoriteStackNavigation