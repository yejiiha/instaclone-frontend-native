import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../ThemeManager";

export default function Profile({ navigation, route }) {
  const theme = useTheme();
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
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
        Someone's Profile
      </Text>
    </View>
  );
}
