import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ThemeProvider } from "styled-components";
import { StyleSheet } from "react-native";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  const isDarkMode = scheme === "dark";
  const style = isDarkMode ? darkTheme : lightTheme;
  console.log(Appearance.getColorScheme());
  return (
    <ThemeProvider theme={style}>
      <NavigationContainer>
        <LoggedOutNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
