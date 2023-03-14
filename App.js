import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import { PropertiesContextProvider } from './src/Context/PropertiesContext';

export default function App() {
  return (
    <PropertiesContextProvider>
      <NavigationContainer style={styles.container}>
        <StatusBar style="auto" /> 
        <BottomTabNavigation />
      </NavigationContainer>
    </PropertiesContextProvider>
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