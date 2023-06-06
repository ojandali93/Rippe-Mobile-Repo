import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../Screens/ProfileScreen';
import LoginScreen from '../Screens/ProfileScreens/LoginScreen';
import SignupScreen from '../Screens/ProfileScreens/SignupScreen';
import RecentlyViewedScreen from '../Screens/RecentlyViewedScreen';

const StackNav = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen}/>
      <StackNav.Screen name="LoginScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupScreen" component={SignupScreen}/>
      <StackNav.Screen name="RecentViewScreen" component={RecentlyViewedScreen}/>
    </StackNav.Navigator>
  )
}

export default ProfileStackNavigation