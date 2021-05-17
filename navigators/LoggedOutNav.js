import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import { useTheme } from "../ThemeManager";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerTintColor: `${
          theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"
        }`,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="CreateAccount"
        options={{
          headerTitle: false,
          headerTransparent: true,
        }}
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
