import styled, { css } from "styled-components/native";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 10px;
  ${(props) =>
    props.available &&
    css`
      background: #fff;
    `}
  ${(props) =>
    props.limited &&
    css`
      background: #fff;
    `}
    ${(props) =>
    props.unavailable &&
    css`
      background: #fff;
    `}
`;

export default TrafficLight;