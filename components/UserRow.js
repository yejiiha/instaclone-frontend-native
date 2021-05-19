import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;
const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const FollowBtn = styled.TouchableOpacity`
  justify-content: center;
  padding: 7px 10px;
  background-color: ${(props) =>
    props.isFollowing ? props.theme.bgColor : props.theme.blueColor};
  border: 1px solid
    ${(props) => (props.isFollowing ? props.theme.borderColor : null)};
  border-radius: 5px;
`;
const FollowBtnText = styled.Text`
  font-weight: 600;
  color: ${(props) => (props.isFollowing ? props.theme.textColor : "white")};
`;

export default function UserRow({ id, avatar, username, isFollowing, isMe }) {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Column
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("Profile", {
            id,
            username,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn isFollowing={isFollowing}>
          <FollowBtnText isFollowing={isFollowing}>
            {isFollowing ? "Unfollow" : "Follow"}
          </FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
