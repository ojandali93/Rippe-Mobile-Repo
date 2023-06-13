import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from 'react-native-vector-icons'

import PropertyStackNavigation from './PropertiesStackNavigation';

import ProfileStackNavigation from './ProfileStackNavigation';
import FavoriteStackNavigation from './FavoriteStackNavigation';
import FeedStackNavigation from './FeedStackNavigation';
import MarketAnalysisStackNavigation from './MarketAnalysisStackNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator initialRouteName='PropertiesScreen' screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Properties" 
        key='Properties'
        component={PropertyStackNavigation} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />)
        }}/>
      <Tab.Screen 
        name="Favorites" 
        key='Favorites'
        component={FavoriteStackNavigation} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, color}) => (<Feather name={"heart"} color={color} size={size} />)
        }}/>
      <Tab.Screen 
        name="Feed"
        key='Feed'
        component={FeedStackNavigation} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, color}) => (<Feather name={"menu"} color={color} size={size} />)
        }}/>
      {/* <Tab.Screen 
        name="Analysis"
        key='Analysis'
        component={MarketAnalysisStackNavigation} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, color}) => (<Feather name={"trending-up"} color={color} size={size} />)
        }}/> */}
      <Tab.Screen 
        name="Profile"
        key='Profile'
        component={ProfileStackNavigation} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({size, color}) => (<Feather name={"user"} color={color} size={size} />)
        }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigation