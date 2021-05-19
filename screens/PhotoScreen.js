import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useTheme } from "../ThemeManager";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../components/Fragment";
import Photo from "../components/feed/Photo";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
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

export default function PhotoScreen({ route }) {
  const theme = useTheme();
  const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{
          backgroundColor: `${theme.mode === "dark" ? "black" : "#fafafa"}`,
        }}
        contentContainerStyle={{
          backgroundColor: `${theme.mode === "dark" ? "black" : "#fafafa"}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} fullView />
      </ScrollView>
    </ScreenLayout>
  );
}
