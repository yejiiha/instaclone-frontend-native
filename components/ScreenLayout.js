import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../ThemeManager";

export default function ScreenLayout({ loading, children }) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: `${theme.mode === "dark" ? "black" : "#fafafa"}`,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}
        />
      ) : (
        children
      )}
    </View>
  );
}
