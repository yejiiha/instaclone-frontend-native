import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../ThemeManager";

export default function Comments({ navigation }) {
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
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text
          style={{
            color: `${theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}`,
          }}
        >
          Comments
        </Text>
      </TouchableOpacity>
    </View>
  );
}
