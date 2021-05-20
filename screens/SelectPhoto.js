import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const Top = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const Bottom = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function SelectPhoto() {
  return (
    <Container>
      <Top></Top>
      <Bottom></Bottom>
    </Container>
  );
}
