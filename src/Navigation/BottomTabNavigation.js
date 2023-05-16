import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PropertyStackNavigation from './PropertiesStackNavigation';

import ProfileStackNavigation from './ProfileStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';
import FeedStackNavigation from './FeedStackNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator initialRouteName='PropertiesScreen' screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Properties" 
        key='Properties'
        component={PropertyStackNavigation} />
      <Tab.Screen 
        name="Favorites" 
        key='Favorites'
        component={FavoriteStackNavigation} />
      <Tab.Screen 
        name="Feed"
        key='Feed'
        component={FeedStackNavigation} />
      <Tab.Screen 
        name="Profile"
        key='Profile'
        component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation