import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../Screens/ProfileScreen';
import LoginScreen from '../Screens/ProfileScreens/LoginScreen';
import SignupScreen from '../Screens/ProfileScreens/SignupScreen';
import RecentlyViewedScreen from '../Screens/ProfileScreens/RecentlyViewedScreen';
import SavedSearchScreen from '../Screens/ProfileScreens/SavedSearchScreen';
import NewFeedScreen from '../Screens/ProfileScreens/NewFeedScreen';
import AboutScreen from '../Screens/ProfileScreens/AboutUsScreen';
import PaymentCalculationScreen from '../Screens/ProfileScreens/PaymentCalculationScreen';

const StackNav = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen}/>
      <StackNav.Screen name="LoginScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupScreen" component={SignupScreen}/>
      <StackNav.Screen name="RecentViewScreen" component={RecentlyViewedScreen}/>
      <StackNav.Screen name="SavedSearchScreen" component={SavedSearchScreen}/>
      <StackNav.Screen name="NewFeedProfileScreen" component={NewFeedScreen}/>
      <StackNav.Screen name="AboutUsScreen" component={AboutScreen}/>
      <StackNav.Screen name="PaymentCalculationScreen" component={PaymentCalculationScreen}/>
    </StackNav.Navigator>
  )
}

export default ProfileStackNavigation