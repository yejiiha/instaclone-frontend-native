import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { darkTheme } from "../theme";
import { SEE_ROOM_QUERY } from "../components/dm/DMQueries";

const MessageContiner = styled.View`
  padding: 0 20px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 25px;
`;

const Message = styled.Text`
  color: ${(props) =>
    props.outGoing ? "rgb(38, 38, 38)" : `${props.theme.textColor}`};
  background-color: ${(props) =>
    props.outGoing ? `${props.theme.mediumGray}` : "null"};
  border: ${(props) =>
    !props.outGoing ? `1px solid ${props.theme.borderColor}` : "none"};
  padding: 10px 15px;
  overflow: hidden;
  border-radius: 20px;
  font-size: 16px;
  margin: 0 10px;
`;

const TextInput = styled.TextInput`
  margin: 25px 0 10px 0;
  width: 95%;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 20px;
  border-radius: 1000px;
  color: ${(props) => props.theme.textColor};
`;

export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.talkingTo?.username,
    });
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContiner
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar
          source={{ uri: message.user.avatar }}
          style={{ borderColor: darkTheme.theme.borderColor, borderWidth: 0.5 }}
        />
      </Author>
      <Message
        outGoing={message.user.username !== route?.params?.talkingTo?.username}
      >
        {message.payload}
      </Message>
    </MessageContiner>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={63}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
