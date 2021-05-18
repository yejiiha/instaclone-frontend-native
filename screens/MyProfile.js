import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../ThemeManager";

export default function MyProfile() {
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
      <Text
        style={{
          color: `${theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}`,
        }}
      >
        My Profile
      </Text>
    </View>
  );
}
