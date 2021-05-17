import React from "react";
import { Text, View, TouchableOpacity, Switch } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../ThemeManager";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default function Welcome({ navigation }) {
  const theme = useTheme();
  return (
    <Container>
      <MainText>Welcome</MainText>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <MainText>Go to Create Account</MainText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <MainText>Go to Login</MainText>
        </View>
      </TouchableOpacity>
      <Switch
        value={theme.mode === "dark"}
        onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
      />
    </Container>
  );
}
