import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketAnalysisScreen from '../Screens/MarketAnalysisScreen';

const StackNav = createNativeStackNavigator();

const MarketAnalysisStackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="AnalysisScreen" component={MarketAnalysisScreen}/>
    </StackNav.Navigator>
  )
}

export default MarketAnalysisStackNavigation