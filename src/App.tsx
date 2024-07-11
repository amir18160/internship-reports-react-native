// motio animations
import "react-native-reanimated";
import "react-native-gesture-handler";

// react
import { useEffect } from "react";
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
import { useAxiosInterceptors } from "hooks/useAxiosInterceptor";

// ui library: react native paper
import { PaperProvider } from "react-native-paper";

// providers
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DatabaseProvider } from "context/DatabaseProvider";

// prevent screen to be shown until fonts are loaded
SplashScreen.preventAutoHideAsync();

// initialize query client
const queryClient = new QueryClient();

export default function App() {
  // load fonts
  const [loaded, error] = useLoadFont();

  // initialize store
  const { isLoading: isLoadingUserFromStorage } = useInitializeStore();

  // initialize axios interceptors
  useAxiosInterceptors();

  // prevent screen to be shown until fonts are loaded
  useEffect(
    function () {
      if (!isLoadingUserFromStorage && (loaded || error)) SplashScreen.hideAsync();
    },
    [loaded, error, isLoadingUserFromStorage],
  );

  // render
  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider>
          <StatusBar style="light" animated />
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <StackNavigation />
            </SafeAreaView>
          </NavigationContainer>
        </DatabaseProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
