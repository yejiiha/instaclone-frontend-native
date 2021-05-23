import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import { useTheme } from "../ThemeManager";
import RoomList from "../components/dm/RoomList";
import useUser from "../hooks/useUser";
import { SEE_ROOMS_QUERY } from "../components/dm/DMQueries";

export default function Rooms({ navigation }) {
  const theme = useTheme();
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: userData } = useUser();
  const renderItem = ({ item: room }) => <RoomList {...room} />;

  useEffect(() => {
    navigation.setOptions({
      title: userData?.me?.username,
    });
  }, []);

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
