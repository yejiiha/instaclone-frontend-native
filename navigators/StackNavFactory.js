import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Profile from "../screens/Profile";
import PhotoScreen from "../screens/PhotoScreen";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import MyProfile from "../screens/MyProfile";
import { useTheme } from "../ThemeManager";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: `${
          theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"
        }`,

        headerStyle: {
          shadowColor: `${
            theme.mode === "dark"
              ? "rgba(255,255,255,0.3)"
              : "rgb(219, 219, 219)"
          }`,
          backgroundColor: `${theme.mode === "dark" ? "black" : "#fafafa"}`,
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxHeight: 40 }}
                resizeMode="contain"
                source={
                  theme.mode === "dark"
                    ? require("../assets/logo-dark.png")
                    : require("../assets/logo.png")
                }
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "MyProfile" ? (
        <Stack.Screen name="MyProfile" component={MyProfile} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        options={{ title: "Post" }}
        name="PhotoScreen"
        component={PhotoScreen}
      />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
