import React, { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import ErrorMessage from "../components/auth/ErrorMessage";

export default function Login({ navigation }) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 5,
        message: "Username should be longer than 5 chars.",
      },
    });
    register("password", { required: "Password is required." });
  }, [register]);

  return (
    <AuthLayout>
      <Controller
        control={control}
        render={() => (
          <TextInput
            placeholder="Username"
            ref={usernameRef}
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("username", text)}
          />
        )}
        name="username"
      />
      <ErrorMessage message={errors?.username?.message} />

      <Controller
        control={control}
        render={() => (
          <TextInput
            placeholder="Password"
            ref={passwordRef}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("password", text)}
          />
        )}
        name="password"
      />
      <ErrorMessage message={errors?.password?.message} />

      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
