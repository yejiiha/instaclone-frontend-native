import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { USER_FRAGMENT } from "../components/Fragment";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { useTheme } from "../ThemeManager";

const SEE_PHOTO_LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }) {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_PHOTO_LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  const renderUser = ({ item: user }) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
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
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
}
