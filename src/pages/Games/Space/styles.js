import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  /*   @media (max-width: 768px) {
    padding: 10px; 
    background-size: 100%;
    background-position: center;
  } */
`;

export const General = styled.div`
  display: flex;
  width: auto;
  margin-bottom: 20px;
  margin-left: 30px;
`;
export const Header = styled.div`
  margin-right: 15px;
`;

export const ImageHeader = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-top: 5px;
  object-fit: cover;
`;
export const Main = styled.div`
  position: relative;
  width: 80%;
  padding: 10px;
  background-color: #3cb371;
  color: #fff;
  border-radius: 10px;

  ::before {
    content: "";
    position: absolute;
    top: 40%;
    left: -20px; /* Ajuste o valor para posicionar o triângulo */
    margin-top: -10px; /* Ajuste o valor para centralizar verticalmente */
    border-width: 10px;
    border-style: solid;
    border-color: transparent #3cb371 transparent transparent;
  }
`;

export const MainMsg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
export const MainName = styled.span`
font-weight: bold;
`;
export const MainBody = styled.span``;
