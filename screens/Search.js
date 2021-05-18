import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../ThemeManager";

export default function Search({ navigation }) {
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
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text
          style={{
            color: `${theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}`,
          }}
        >
          Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
