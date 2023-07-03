import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../Screens/FeedScreen'
import NewFeedScreen from '../Screens/FeedScreens/NewFeedScreen'
import LoginScreen from '../Screens/FeedScreens/LoginScreen';
import SignupScreen from '../Screens/FeedScreens/SignupScreen';
import PropertyScreen from '../Screens/FeedScreens/PropertyScreen';

const StackNav = createStackNavigator();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator initialRouteName='FeedScreen' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FeedScreen" component={FeedScreen}/>
      <StackNav.Screen name="NewFeedScreen" component={NewFeedScreen}/>
      <StackNav.Screen name="LoginFeedScreen" component={LoginScreen}/>
      <StackNav.Screen name="SignupFeedScreen" component={SignupScreen}/>
      <StackNav.Screen name="PropertyFeedScreen" component={PropertyScreen}/>
    </StackNav.Navigator>
  )
}

export default FeedStackNavigation