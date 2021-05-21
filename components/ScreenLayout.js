import React from "react";
import { ActivityIndicator, View } from "react-native";
import { darkTheme, lightTheme } from "../theme";
import { useTheme } from "../ThemeManager";

export default function ScreenLayout({ loading, children }) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: `${
          theme.mode === "dark"
            ? darkTheme.theme.bgColor
            : lightTheme.theme.bgColor
        }`,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={
            theme.mode === "dark"
              ? darkTheme.theme.textColor
              : lightTheme.theme.textColor
          }
        />
      ) : (
        children
      )}
    </View>
  );
}
