import React, { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import ErrorMessage from "../components/auth/ErrorMessage";
import { isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const usernameRef = useRef();
  const passwordRef = useRef();
  const onCompleted = (data) => {
    const {
      login: { ok, token },
    } = data;

    if (ok) {
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
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
            value={watch("username")}
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
            value={watch("password")}
          />
        )}
        name="password"
      />
      <ErrorMessage message={errors?.password?.message} />

      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
