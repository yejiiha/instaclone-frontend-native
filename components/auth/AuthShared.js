import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.formColor};
  padding: 15px 5px;
  margin-bottom: 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
`;
