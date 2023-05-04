import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PropertyStackNavigation from './PropertiesStackNavigation';
import MarketAnalysisStackNavigation from './MarketAnalysisStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Properties" 
        key='Properties'
        component={PropertyStackNavigation} />
      <Tab.Screen 
        name="Favorites" 
        key='Favorites'
        component={FavoriteStackNavigation} />
      <Tab.Screen 
        name="Analysis"
        key='Analysis'
        component={MarketAnalysisStackNavigation} />
      <Tab.Screen 
        name="Profile"
        key='Profile'
        component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation