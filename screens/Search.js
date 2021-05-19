import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;
const SearchingWrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;
const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;
const Input = styled.TextInput`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.formColor};
  width: ${(props) => props.width / 1.2}px;
  padding: 7px 10px;
  border-radius: 5px;
`;
const SearchedImageContainer = styled.TouchableOpacity`
  border: 1px solid ${(props) => props.theme.bgColor};
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { register, setValue, handleSubmit } = useForm();
  const [startQueryFn, { data, loading, called }] = useLazyQuery(SEARCH_PHOTOS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: { keyword },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search"
      autoCapitalize="none"
      returnKeyLable="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  const renderItem = ({ item: photo }) => (
    <SearchedImageContainer
      onPress={() =>
        navigation.navigate("PhotoScreen", {
          photoId: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
    </SearchedImageContainer>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 2 });
  }, []);

  return (
    <DismissKeyboard>
      <SearchingWrapper>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </SearchingWrapper>
    </DismissKeyboard>
  );
}
