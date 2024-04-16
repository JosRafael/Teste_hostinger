import React, { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Container } from "./styles";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import gestao from "../../assets/Tutorial/Gestao.png";
import quebraPadrao from "../../assets/Tutorial/THUMB_TELEGRAM.png";
import crieUmaContaButton from "../../assets/CRIE_UMA_CONTA.png"; // Importe a imagem do botão
import telegram from "../../assets/telegram.png"; // Importe a imagem do botão
import api from "../../config/api";
import { AuthContext } from "../../context/auth";

const blinkAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const DivLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.9);
  border-top: 4px solid #767676;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

const AdditionalText = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 90px;
  text-align: left;
  color: #fff;
  font-family: ubuntu, Sans-serif;
  font-size: 21px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.3em;
  z-index: 2;
  text-align: center;
`;

const EmailTextContainer = styled.div`
  color: #14b1a4;
  font-family: "Verdana", Geneva, sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  text-align: center;
`;

const GradientRectangle = styled.div`
  background: linear-gradient(to bottom, #14b1a4, rgba(187, 240, 39, 0));
  border-radius: 15px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Adiciona sombra escura */
  margin-bottom: 20px; /* Espaçamento entre os containers */
`;

const Banner = styled.img`
  max-width: 100%;
  max-height: 90%;
  width: auto;
  height: auto;

  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Adiciona sombra escura */
`;

const BannerText = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 10px; /* Espaçamento entre o banner e o texto */
  text-align: center; /* Centralizando o texto */
  font-family: ubuntu, Sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.3em;
  z-index: 2;
`;
const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Define a altura da tela inteira */
`;
const BlueText = styled.span`
  color: #2ca6ff; /* Cor azul */
  font-size: 18px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent !important;
  }
`;

const ButtonWithBlink = styled.button`
  background-color: #2ca6ff;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Adiciona sombra escura */
  animation: ${blinkAnimation} 2s linear infinite; /* Aplica a animação */
`;

const ButtonWithBlink1 = styled(ButtonWithBlink)`
  background-color: #ecbf41;
`;

const CustomButton = styled.button`
  background-image: url(${crieUmaContaButton}); // Define a imagem de fundo do botão
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%; /* Defina a largura desejada para o botão */
  height: 120px; /* Defina a altura desejada para o botão */
  padding: 32px 0;
  margin-top: -30px;
  background-color: #56cca100;
  border: none;
  cursor: pointer;
  &.blink-button {
    animation: ${blinkAnimation} 2s linear infinite; /* Aplica a animação apenas a essa classe */
  }
`;
const CustomButton2 = styled.button`
  background-image: url(${telegram}); // Define a imagem de fundo do botão
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%; /* Defina a largura desejada para o botão */
  height: 120px; /* Defina a altura desejada para o botão */
  padding: 32px 0;
  margin-top: -30px;
  background-color: #56cca100;
  border: none;
  cursor: pointer;
  &.blink-button {
    animation: ${blinkAnimation} 2s linear infinite; /* Aplica a animação apenas a essa classe */
  }
`;

const DivButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonLuis = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border: 1px solid #14b1a4;
  width: 40%;
  height: 40px;
  margin-bottom: 20px;
  cursor: pointer;
  text-transform: uppercase;
  background-image: linear-gradient(
    to right,
    #14b1a4,
    #14b1a4,
    #2d5ae0,
    #14b1a4
  );
  box-shadow: 3px -3px #2d5ae0;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
  && {
    transform: scale(1.1);
  }
`;
const ButtonLuisTxt = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 10px black;
`;


const Tutorial = () => {
  const { user } = useContext(AuthContext);
  const [configPage, setConfigPage] = useState();
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function bonus() {
      setLoading(true);
      await api
        .get("/bonus", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setConfigPage(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error: " + err.message);
          setLoading(false);
        });
    }

    async function cards() {
      setLoading(true);
      await api
        .get("/bonus/card", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setCards(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error: " + err.message);
          setLoading(false);
        });
    }

    bonus();
    cards();
  }, [user.token]);
  return (
    <>
      <GlobalStyle />
      <Nav></Nav>
      <Container>
        <AdditionalText>{configPage && configPage[0].title}</AdditionalText>
        <EmailTextContainer className="elementor-1137 elementor-element elementor-element-a04ad91">
          {configPage && configPage[0].subtitle}
        </EmailTextContainer>
        {
          loading && <DivLoading>
            <LoadingSpinner />
          </DivLoading>
        }
        { !loading && cards && cards.map((element, index) => (
          <>
            <GradientRectangle>
              <Banner src={`${element.banner}`} alt="Banner" />
              <BannerText>{element.title}</BannerText>
            </GradientRectangle>

            <DivButton>
              <ButtonLuis>
                <a
                  style={{ textDecoration: "none" }}
                  href={element.link_youtube}
                  about="ex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ButtonLuisTxt>{element.button_name}</ButtonLuisTxt>
                </a>
              </ButtonLuis>
            </DivButton>
          </>
        ))}
        <br />
        <br />
        <br />
        <br /> <br /> <br /> <br /> <br /> <br />
      </Container>
      <Menu></Menu>
    </>
  );
};

export default Tutorial;
