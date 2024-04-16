import React from "react";
import styled from "styled-components";

const IframeContainer = styled.iframe`
  width: 100%;
  height: 500px; /* Defina a altura desejada para o iframe */
  border-radius: 20px;
`;

const IframeComponent = ({link}) => {
  return (
    <IframeContainer
      src={link}
      title="Live"
      frameborder="0"
      scrolling="on"
    ></IframeContainer>
  );
};

export default IframeComponent;