import React, { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import ErrorMessage from "../components/auth/ErrorMessage";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();

    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("firstName", {
      required: "First Name is required.",
    });
    register("lastName");
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 5,
        message: "Username should be longer than 5 chars.",
      },
    });
    register("email", { required: "Email is required." });
    register("password", { required: "Password is required." });
  }, [register]);

  return (
    <AuthLayout>
      <Controller
        control={control}
        render={() => (
          <TextInput
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            onChangeText={(text) => setValue("firstName", text)}
          />
        )}
        name="firstName"
      />
      <ErrorMessage message={errors?.firstName?.message} />

      <TextInput
        placeholder="Last Name"
        ref={lastNameRef}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />

      <Controller
        control={control}
        render={() => (
          <TextInput
            placeholder="UserName"
            ref={usernameRef}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
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
            placeholder="Email"
            ref={emailRef}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("email", text)}
          />
        )}
        name="email"
      />
      <ErrorMessage message={errors?.email?.message} />

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
        text="Create Account"
        disabled={
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("email") ||
          !watch("username") ||
          !watch("password")
        }
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
