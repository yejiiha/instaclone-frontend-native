import React, { useEffect, useState, useRef } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import DiscardModal from "../components/upload/DiscardModal";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Actions = styled.View`
  position: absolute;
  width: 100%;
  bottom: 20px;
  flex: 0.3;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const SliderContainer = styled.View``;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CameraFlashContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const CameraContainer = styled.View`
  flex: 2;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const CameraSwitchContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const DiscardContainer = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
  justify-content: space-between;
`;

const DownloadContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;
`;

const UploadContainer = styled(DownloadContainer)`
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDiscard = () => setTakenPhoto("");

  const savePhoto = async () => {
    await MediaLibrary.saveToLibraryAsync(takenPhoto);
    console.log(takenPhoto);
  };

  const goToUpload = () => {};

  return (
    <Container>
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          zoom={zoom}
          style={{ flex: 1 }}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseBtn onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseBtn>

          {takenPhoto === "" ? (
            <Actions>
              <SliderContainer>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="rgba(255,255,255,0.5)"
                  onValueChange={onZoomValueChange}
                />
              </SliderContainer>
              <ButtonsContainer>
                <CameraFlashContainer>
                  <TouchableOpacity onPress={onFlashChange}>
                    <Ionicons
                      size={40}
                      color="white"
                      name={
                        flashMode === Camera.Constants.FlashMode.off
                          ? "flash-off"
                          : flashMode === Camera.Constants.FlashMode.on
                          ? "flash"
                          : flashMode === Camera.Constants.FlashMode.auto
                          ? "eye"
                          : ""
                      }
                    />
                  </TouchableOpacity>
                </CameraFlashContainer>
                <CameraContainer>
                  <TakePhotoBtn onPress={takePhoto} />
                </CameraContainer>
                <CameraSwitchContainer>
                  <TouchableOpacity onPress={onCameraSwitch}>
                    <Ionicons size={40} color="white" name="camera-reverse" />
                  </TouchableOpacity>
                </CameraSwitchContainer>
              </ButtonsContainer>
            </Actions>
          ) : null}
        </Camera>
      ) : (
        <ImageBackground source={{ uri: takenPhoto }} style={{ flex: 1 }}>
          {takenPhoto !== "" && (
            <>
              <DiscardModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onDiscard={onDiscard}
              />
              <DiscardContainer onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" color="white" size={30} />
              </DiscardContainer>
              <PhotoActions>
                <DownloadContainer>
                  <Ionicons
                    onPress={savePhoto}
                    name="download-outline"
                    color="white"
                    size={30}
                    style={{
                      textAlign: "center",
                      paddingLeft: 1,
                    }}
                  />
                </DownloadContainer>
                <UploadContainer>
                  <Ionicons
                    name="arrow-forward-outline"
                    color="black"
                    size={30}
                  />
                </UploadContainer>
              </PhotoActions>
            </>
          )}
        </ImageBackground>
      )}
    </Container>
  );
}
