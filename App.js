import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import { PropertiesContextProvider } from './src/Context/PropertiesContext';
import { InvestmentContextProvider } from './src/Context/InvestmentContext';

export default function App() {
  return (
    <InvestmentContextProvider>
      <PropertiesContextProvider>
        <NavigationContainer style={styles.container}>
          <StatusBar style="auto" /> 
          <BottomTabNavigation />
        </NavigationContainer>
      </PropertiesContextProvider>
    </InvestmentContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});