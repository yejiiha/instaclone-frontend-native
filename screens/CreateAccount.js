import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount() {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done");
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
        style={{
          width: "100%",
        }}
      >
        <TextInput
          placeholder="First Name"
          returnKeyType="next"
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(lastNameRef)}
        />
        <TextInput
          placeholder="Last Name"
          ref={lastNameRef}
          returnKeyType="next"
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(usernameRef)}
        />
        <TextInput
          placeholder="UserName"
          ref={usernameRef}
          returnKeyType="next"
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInput
          placeholder="Email"
          ref={emailRef}
          keyboardType="email-address"
          returnKeyType="next"
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          placeholder="Password"
          ref={passwordRef}
          secureTextEntry
          returnKeyType="done"
          placeholderTextColor="gray"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={onDone}
        />

        <AuthButton
          text="Create Account"
          disabled={true}
          onPress={() => null}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
