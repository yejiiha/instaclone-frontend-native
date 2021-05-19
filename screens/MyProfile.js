import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
import { useTheme } from "../ThemeManager";

export default function MyProfile({ navigation }) {
  const theme = useTheme();
  const { data } = useUser();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
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
