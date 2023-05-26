import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import { PropertiesContextProvider } from './src/Context/PropertiesContext';
import { SearchFilterContextProvider } from './src/Context/SearchFilterContext';
import { ProfileContextProvider } from './src/Context/ProfileContext';
import { FeedContextProvider } from './src/Context/FeedContext';
import { PropertyContextProvider } from './src/Context/PropertyContext';
import { FinancesContextProvider } from './src/Context/FinancesContext';
import { FavoritesContextProvider } from './src/Context/FavoritesContext';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <StatusBar style="auto" />
      <FavoritesContextProvider>
        <FeedContextProvider>
          <ProfileContextProvider>
            <SearchFilterContextProvider>
              <FinancesContextProvider>
                <PropertyContextProvider>
                  <PropertiesContextProvider>
                    <BottomTabNavigation />
                  </PropertiesContextProvider>
                </PropertyContextProvider>
              </FinancesContextProvider> 
            </SearchFilterContextProvider>
          </ProfileContextProvider>
        </FeedContextProvider>
      </FavoritesContextProvider>
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