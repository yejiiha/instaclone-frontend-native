import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { darkTheme } from "../theme";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const Top = styled.View`
  flex: 2;
  background-color: ${(props) => props.theme.bgColor};
`;

const Bottom = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 2px;
  right: 0;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  font-size: 16px;
  margin-right: 7px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const numColumns = 4;
  const { width } = useWindowDimensions();

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setSelectedPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadPhoto", {
          file: selectedPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [selectedPhoto]);

  const selectPhoto = (uri) => {
    setSelectedPhoto(uri);
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => selectPhoto(photo.uri)} activeOpacity={1}>
      <Image
        source={{ uri: photo.uri }}
        style={{
          width: width / numColumns,
          height: width / numColumns,
        }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={
            photo.uri === selectedPhoto
              ? darkTheme.theme.blueColor
              : "rgba(255,255,255,0.3)"
          }
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <Top>
        {selectedPhoto !== "" ? (
          <Image
            source={{ uri: selectedPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
