import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount() {
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Last Name"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="UserName"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", width: "100%" }}
      />

      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
