import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { darkTheme, lightTheme } from "../theme";
import { useTheme } from "../ThemeManager";

export default function Comments({ navigation }) {
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
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text
          style={{
            color: `${
              theme.mode === "dark"
                ? darkTheme.theme.textColor
                : lightTheme.theme.textColor
            }`,
          }}
        >
          Comments
        </Text>
      </TouchableOpacity>
    </View>
  );
}
