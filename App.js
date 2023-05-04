import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import { PropertiesContextProvider } from './src/Context/PropertiesContext';
import { InvestmentContextProvider } from './src/Context/InvestmentContext';
import { SearchFilterContextProvider } from './src/Context/SearchFilterContext';
import { PropertyContextProvider } from './src/Context/PropertyContext';
import { AnalysisContextProvider } from './src/Context/AnalysisContext';
import { ProfileContextProvider } from './src/Context/ProfileContext';

export default function App() {
  return (
    <ProfileContextProvider>
      <AnalysisContextProvider>
        <SearchFilterContextProvider>
          <InvestmentContextProvider>
            <PropertiesContextProvider>
              <PropertyContextProvider>
                <NavigationContainer style={styles.container}>
                  <StatusBar style="auto" /> 
                  <BottomTabNavigation />
                </NavigationContainer>
              </PropertyContextProvider>
            </PropertiesContextProvider>
          </InvestmentContextProvider>
        </SearchFilterContextProvider>
      </AnalysisContextProvider>
    </ProfileContextProvider>
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