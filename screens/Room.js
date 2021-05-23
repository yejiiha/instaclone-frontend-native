import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme } from "../theme";
import {
  SEE_ROOM_QUERY,
  SEND_MESSAGE_MUTATION,
} from "../components/dm/DMQueries";
import useUser from "../hooks/useUser";
import { useTheme } from "../ThemeManager";

const MessageContiner = styled.View`
  padding: ${(props) => (props.outGoing ? "0 10px" : "0 15px")};
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
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) =>
    props.outGoing ? `${props.theme.messageBubble}` : "null"};
  border: ${(props) =>
    !props.outGoing ? `1px solid ${props.theme.borderColor}` : "none"};
  padding: 10px 15px;
  overflow: hidden;
  border-radius: 20px;
  font-size: 16px;
  margin: ${(props) => (props.outGoing ? 0 : `0 10px`)};
`;

const TextInput = styled.TextInput`
  /* margin: 25px 0 10px 0;
  width: 95%; */
  width: 90%;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 20px;
  border-radius: 1000px;
  color: ${(props) => props.theme.textColor};
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 20px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendBtn = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
  const theme = useTheme();
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;

    if (ok && userData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        __typename: "Message",
        id,
        payload: message,
        user: {
          username: userData.me.username,
          avatar: userData.me.avatar,
        },
        read: true,
      };
      const messageFragment = cache.writeFragment({
        data: messageObj,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

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
        {message.user.username === route?.params?.talkingTo?.username && (
          <Avatar
            source={{ uri: message.user.avatar }}
            style={{
              borderColor: darkTheme.theme.borderColor,
              borderWidth: 0.5,
            }}
          />
        )}
      </Author>
      <Message
        outGoing={message.user.username !== route?.params?.talkingTo?.username}
      >
        {message.payload}
      </Message>
    </MessageContiner>
  );

  const messagesArray = [...(data?.seeRoom?.messages ?? [])];
  messagesArray.reverse();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={63}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%", marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
          data={messagesArray}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <InputContainer>
          <TextInput
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendBtn
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? theme.mode === "dark"
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)"
                  : theme.mode === "dark"
                  ? "white"
                  : "rgb(38, 38,38)"
              }
              size={22}
            />
          </SendBtn>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
