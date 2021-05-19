import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useTheme } from "../ThemeManager";

const Input = styled.TextInput`
  color: ${(props) => props.theme.textColor};
`;

export default function Search({ navigation }) {
  const theme = useTheme();
  const { register, setValue, watch } = useForm();
  const SearchBox = () => (
    <Input
      placeholder="Search"
      autoCapitalize="none"
      returnKeyLable="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);

  console.log(watch());

  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: `${theme.mode === "dark" ? "black" : "#fafafa"}`,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: `${theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}`,
          }}
        >
          Photo
        </Text>
      </View>
    </DismissKeyboard>
  );
}
