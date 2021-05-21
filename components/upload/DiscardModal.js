import React from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import { darkTheme } from "../../theme";

const Overlay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: 70%;
  height: 220px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  margin: 30px 0 20px 0;
  font-size: 18px;
  font-weight: 600;
`;

const ModalContentText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.darkGray};
`;

const ModalSelectors = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ModalSelector = styled.Pressable`
  padding: 10px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalSelectorText = styled.Text`
  font-size: 15px;
`;

export default function DiscardModal({
  modalVisible,
  setModalVisible,
  onDiscard,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Overlay>
        <ModalContainer>
          <ModalTitle>Discard Media?</ModalTitle>
          <ModalContentText>
            If you go back now, you will lose any changes you've made.{" "}
          </ModalContentText>
          <ModalSelectors>
            <ModalSelector
              style={{
                borderColor: darkTheme.theme.borderColor,
                borderBottomWidth: 1,
                borderTopWidth: 1,
              }}
            >
              <ModalSelectorText
                onPress={onDiscard}
                style={{ color: "tomato", fontWeight: "600" }}
              >
                Discard
              </ModalSelectorText>
            </ModalSelector>
            <ModalSelector onPress={() => setModalVisible(!modalVisible)}>
              <ModalSelectorText>Cancel</ModalSelectorText>
            </ModalSelector>
          </ModalSelectors>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}
