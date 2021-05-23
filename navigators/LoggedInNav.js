import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadPhoto from "../screens/UploadPhoto";
import { useTheme } from "../ThemeManager";
import { darkTheme, lightTheme } from "../theme";
import DMNav from "./DMNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  const theme = useTheme();
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadPhoto"
        options={{
          headerBackTitleVisible: false,
          title: "New Post",
          headerTintColor: `${
            theme.mode === "dark"
              ? darkTheme.theme.textColor
              : lightTheme.theme.textColor
          }`,
          headerStyle: {
            backgroundColor: `${
              theme.mode === "dark"
                ? darkTheme.theme.bgColor
                : lightTheme.theme.bgColor
            }`,
          },
        }}
        component={UploadPhoto}
      />
      <Stack.Screen
        name="DM"
        component={DMNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
