import { createStackNavigator } from '@react-navigation/stack'
import MarketAnalysisScreen from '../Screens/MarketAnalysisScreen';

const StackNav = createStackNavigator();

const MarketAnalysisStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="AnalysisScreen" component={MarketAnalysisScreen}/>
    </StackNav.Navigator>
  )
}

export default MarketAnalysisStackNavigation