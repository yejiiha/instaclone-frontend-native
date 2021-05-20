import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { useTheme } from "../ThemeManager";
import { createStackNavigator } from "@react-navigation/stack";
import { darkTheme, lightTheme } from "../theme";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: `${
            theme.mode === "dark"
              ? darkTheme.theme.bgColor
              : lightTheme.theme.bgColor
          }`,
        },
        activeTintColor: `${
          theme.mode === "dark"
            ? darkTheme.theme.textColor
            : lightTheme.theme.textColor
        }`,
        indicatorStyle: {
          backgroundColor: darkTheme.theme.blueColor,
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: `${
                theme.mode === "dark"
                  ? darkTheme.theme.textColor
                  : lightTheme.theme.textColor
              }`,
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: `${
                  theme.mode === "dark"
                    ? darkTheme.theme.bgColor
                    : lightTheme.theme.bgColor
                }`,
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{
                title: "New Post",
              }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
