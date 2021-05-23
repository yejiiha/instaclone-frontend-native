import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../components/Fragment";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/feed/Photo";
import { useTheme } from "../ThemeManager";
import { darkTheme, lightTheme } from "../theme";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      isMine
      createdAt
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const MessageButton = () => (
    <TouchableOpacity
      style={{ marginRight: 12 }}
      onPress={() => navigation.navigate("DM")}
    >
      <Ionicons
        name="paper-plane-outline"
        color={
          theme.mode === "dark"
            ? darkTheme.theme.textColor
            : lightTheme.theme.textColor
        }
        size={26}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessageButton,
    });
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </ScreenLayout>
  );
}
