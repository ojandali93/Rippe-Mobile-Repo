import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PropertiesScreen from '../Screens/PropertiesScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import FeedScreen from '../Screens/FeedScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation