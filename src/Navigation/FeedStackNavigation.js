import { createStackNavigator } from '@react-navigation/stack'
import FeedScreen from '../Screens/FeedScreen'
import NewFeedScreen from '../Screens/FeedScreens/NewFeedScreen'

const StackNav = createStackNavigator();

const FeedStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FeedScreen" component={FeedScreen}/>
      <StackNav.Screen name="NewFeedScreen" component={NewFeedScreen}/>
    </StackNav.Navigator>
  )
}

export default FeedStackNavigation