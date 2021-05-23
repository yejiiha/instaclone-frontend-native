import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { ROOM_FRAGMENT } from "../components/Fragment";
import ScreenLayout from "../components/ScreenLayout";
import useUser from "../hooks/useUser";
import { useTheme } from "../ThemeManager";
import { darkTheme } from "../theme";

export const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

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

export default function Rooms() {
  const theme = useTheme();
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: userData } = useUser();
  const renderItem = ({ item: room }) => {
    const notMe = room.users.find(
      (user) => user.username !== userData?.me?.username
    );
    return (
      <RoomContainer>
        <Column>
          <Avatar
            source={{ uri: notMe.avatar }}
            style={{
              borderColor: darkTheme.theme.borderColor,
              borderWidth: 0.5,
            }}
          />
          <Data>
            <Username>{notMe.username}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === "1" ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 0.5,
              backgroundColor: `${
                theme.mode === "dark"
                  ? "rgba(255,255,255,0.3)"
                  : "rgb(219, 219, 219)"
              }`,
            }}
          ></View>
        )}
      />
    </ScreenLayout>
  );
}
