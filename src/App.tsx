// react
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "navigation/StackNavigation";

// expo
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// custom hooks
import { useLoadFont } from "hooks/useLoadFont";
import { useInitializeStore } from "hooks/useInitializeUserStore";

// ui library: react native paper
import { PaperProvider } from "react-native-paper";

// providers
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// prevent screen to be shown until fonts are loaded
SplashScreen.preventAutoHideAsync();

// initialize query client
const queryClient = new QueryClient();

export default function App() {
  const [loaded, error] = useLoadFont();
  const { isLoading: isLoadingUserFromStorage } = useInitializeStore();

  useEffect(
    function () {
      if (!isLoadingUserFromStorage && (loaded || error)) SplashScreen.hideAsync();
    },
    [loaded, error, isLoadingUserFromStorage],
  );

  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" animated />
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StackNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
