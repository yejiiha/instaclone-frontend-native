import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.bgColor};
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

export default function Welcome({ navigation }) {
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
    </Container>
  );
}
