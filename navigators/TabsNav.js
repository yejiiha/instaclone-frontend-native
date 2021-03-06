import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { useTheme } from "../ThemeManager";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";
import useUser from "../hooks/useUser";
import { darkTheme, lightTheme } from "../theme";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const theme = useTheme();
  const { data } = useUser();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: `${
          theme.mode === "dark"
            ? darkTheme.theme.textColor
            : lightTheme.theme.textColor
        }`,
        showLabel: false,
        style: {
          borderTopColor: `${
            theme.mode === "dark"
              ? "rgba(255,255,255,0.3)"
              : "rgb(219, 219, 219)"
          }`,
          backgroundColor: `${
            theme.mode === "dark"
              ? darkTheme.theme.bgColor
              : lightTheme.theme.bgColor
          }`,
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="MyProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data?.me?.avatar }}
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 25,
                  ...(focused && {
                    borderColor: `${
                      theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"
                    }`,
                    borderWidth: 2,
                  }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName="MyProfile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
