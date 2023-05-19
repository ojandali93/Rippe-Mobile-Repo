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
import { FeedContextProvider } from './src/Context/FeedContext';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <StatusBar style="auto" />
      <FeedContextProvider>
        <ProfileContextProvider>
          <AnalysisContextProvider>
            <SearchFilterContextProvider>
              <InvestmentContextProvider>
                <PropertyContextProvider>
                  <PropertiesContextProvider>
                    <BottomTabNavigation />
                  </PropertiesContextProvider>
                </PropertyContextProvider>
              </InvestmentContextProvider>
            </SearchFilterContextProvider>
          </AnalysisContextProvider>
        </ProfileContextProvider>
      </FeedContextProvider>
    </NavigationContainer>
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