import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register("firstName");
    register("lastName");
    register("username");
    register("email");
    register("password");
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        placeholder="Last Name"
        ref={lastNameRef}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        placeholder="UserName"
        ref={usernameRef}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="Email"
        ref={emailRef}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        placeholder="Password"
        ref={passwordRef}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
      />

      <AuthButton
        text="Create Account"
        disabled={true}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
