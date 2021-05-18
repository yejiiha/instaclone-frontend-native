import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";
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
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text
          style={{
            color: `${theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}`,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
