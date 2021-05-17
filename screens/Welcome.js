import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../ThemeManager";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
  color: ${(props) => props.theme.textColor};
`;

const CreateAccount = styled.View`
  padding: 7px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.blueColor};
`;

const CreateAccountText = styled.Text`
  font-weight: 600;
  color: white;
`;

const LoginLink = styled.Text`
  margin-top: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.blueColor};
`;

export default function Welcome({ navigation }) {
  const theme = useTheme();
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={
          theme.mode === "dark"
            ? require("../assets/logo-dark.png")
            : require("../assets/logo.png")
        }
      />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
