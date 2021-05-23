import React from "react";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";
import useUser from "../../hooks/useUser";
import { darkTheme } from "../../theme";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

const Data = styled.View``;

const Username = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 15px;
`;

const UnreadText = styled.Text`
  margin-top: 2px;
  color: ${(props) => props.theme.darkGray};
  font-size: 13px;
`;

const UnreadDot = styled.View`
  width: 5px;
  height: 5px;
  background-color: tomato;
  border-radius: 5px;
`;

export default function RoomList({ id, users, unreadTotal }) {
  const { data: userData } = useUser();
  const talkingTo = users.find(
    (user) => user.username !== userData?.me?.username
  );
  const navigation = useNavigation();
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar
          source={{ uri: talkingTo.avatar }}
          style={{
            borderColor: darkTheme.theme.borderColor,
            borderWidth: 0.5,
          }}
        />
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === "1" ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
