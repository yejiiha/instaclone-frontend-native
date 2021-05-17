import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  padding: 13px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.blueColor};
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  font-weight: 600;
  color: white;
  text-align: center;
`;

export default function AuthButton({ onPress, disabled, text }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
