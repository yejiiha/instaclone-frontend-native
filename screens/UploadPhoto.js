import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0 50px;
`;

const Photo = styled.Image`
  height: 300px;
`;

const CaptionContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: ${(props) => props.theme.formColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  font-size: 16px;
  margin-right: 7px;
`;

export default function UploadPhoto({ route, navigation }) {
  const { register, handleSubmit, setValue } = useForm();

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" style={{ marginRight: 10 }} />
  );
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadPhoto", {
          file: selectedPhoto,
        })
      }
    >
      <HeaderRightText>Share</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions(
      {
        headerRight: HeaderRightLoading,
        headerLeft: () => null,
      },
      []
    );
  });

  const onValid = ({ caption }) => {};

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditting={handleSubmit(onValid)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
