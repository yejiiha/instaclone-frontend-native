import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import { useTheme } from "../ThemeManager";
import { darkTheme, lightTheme } from "../theme";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: false,
        headerTransparent: true,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerTintColor: `${
          theme.mode === "dark"
            ? darkTheme.theme.textColor
            : lightTheme.theme.textColor
        }`,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
