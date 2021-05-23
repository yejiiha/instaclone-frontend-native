import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import { useTheme } from "../ThemeManager";
import { darkTheme, lightTheme } from "../theme";
import useUser from "../hooks/useUser";

const Stack = createStackNavigator();

export default function DMNav() {
  const theme = useTheme();
  const { data: userData } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: `${
          theme.mode === "dark"
            ? darkTheme.theme.textColor
            : lightTheme.theme.textColor
        }`,
        headerStyle: {
          shadowOpacity: 0.3,
          backgroundColor: `${
            theme.mode === "dark"
              ? darkTheme.theme.bgColor
              : lightTheme.theme.bgColor
          }`,
        },
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{ headerTitle: userData?.me?.username }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
