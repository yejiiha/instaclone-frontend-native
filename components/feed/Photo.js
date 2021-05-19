import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeManager";
import { gql, useMutation } from "@apollo/client";

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Likes = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 7px 0px;
  font-weight: 600;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const More = styled.Text`
  color: ${(props) => props.theme.darkGray};
`;
const CaptionText = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 5px;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

export default function Photo({ id, user, file, isLiked, likes, caption }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 400);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [file]);

  const refinedCaption =
    caption !== null &&
    caption
      .split(" ")
      .map((word, index) =>
        /#[\w]+/.test(word) ? (
          <React.Fragment key={index}>{word} </React.Fragment>
        ) : (
          <React.Fragment key={index}>{word} </React.Fragment>
        )
      );
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
      username: user.username,
    });
  };

  return (
    <Container>
      <Header onPress={goToProfile} activeOpacity={1}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        source={{ uri: file }}
        style={{ width, height: imageHeight }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={
                isLiked
                  ? "tomato"
                  : theme.mode === "dark"
                  ? "white"
                  : "rgb(38, 38, 38)"
              }
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={theme.mode === "dark" ? "white" : "rgb(38, 38, 38)"}
            />
          </Action>
        </Actions>
        {likes > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Likes", {
                photoId: id,
              })
            }
          >
            <Likes>
              {likes === 1 ? "1 like" : likes === 0 ? null : `${likes} likes`}
            </Likes>
          </TouchableOpacity>
        ) : null}
        <Caption>
          <TouchableOpacity onPress={goToProfile} activeOpacity={1}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>
            {!showMore && caption?.length > 50
              ? refinedCaption.slice(0, 11)
              : refinedCaption}
            {!showMore && caption?.length > 50 ? (
              <More onPress={() => setShowMore(!showMore)}>... more</More>
            ) : showMore ? (
              <More onPress={() => setShowMore(!showMore)}>... less</More>
            ) : null}
          </CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
