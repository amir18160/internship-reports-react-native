import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

function useLoadFont() {
  const [loaded, error] = useFonts({
    vazir100: require("../assets/fonts/vazirmatn/vazir100.ttf"),
    vazir150: require("../assets/fonts/vazirmatn/vazir150.ttf"),
    vazir200: require("../assets/fonts/vazirmatn/vazir200.ttf"),
    vazir300: require("../assets/fonts/vazirmatn/vazir300.ttf"),
    vazir400: require("../assets/fonts/vazirmatn/vazir400.ttf"),
    vazir500: require("../assets/fonts/vazirmatn/vazir500.ttf"),
    vazir600: require("../assets/fonts/vazirmatn/vazir600.ttf"),
    vazir700: require("../assets/fonts/vazirmatn/vazir700.ttf"),
    mont300: require("../assets/fonts/montserrat/mont300.ttf"),
    mont400: require("../assets/fonts/montserrat/mont400.ttf"),
    mont500: require("../assets/fonts/montserrat/mont500.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return [loaded, error];
}

export { useLoadFont };
