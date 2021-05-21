import React from "react";
import { View, Text } from "react-native";
import { darkTheme, lightTheme } from "../theme";
import { useTheme } from "../ThemeManager";

export default function Notifications() {
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
      <Text
        style={{
          color: `${
            theme.mode === "dark"
              ? darkTheme.theme.textColor
              : lightTheme.theme.textColor
          }`,
        }}
      >
        Notifications
      </Text>
    </View>
  );
}
