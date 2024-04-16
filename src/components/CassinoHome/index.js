import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Banner,
  BannerImg,
  Titulo,
  GamesCircle,
  Operations,
  OperationsHeader,
  OperationsTitle,
  OperationsMain,
  OperationsMainHeader,
  OperationsMainSubtitle,
  Topic,
  OperationsMainCards,
  OperationsMainSubtitleTxt,
  ButtonElite,
} from "./styles";
import { toast } from "react-toastify";

import Nav from "../Nav";
import Menu from "../Menu";
import GameCircle from "../Games/Circle";
import Cards from "../Games/Cards";
import PromoWheel from "../PromoRoleta"; // Certifique-se de corrigir esse caminho para o local correto
import InstallModal from "../InstallModal"; // Atualize o caminho para o arquivo do modal
import { useNavigate } from "react-router-dom";

import styled, { createGlobalStyle, keyframes } from "styled-components";

import Cassino from "../../assets/HomePhoto/Roleta.png";
import Slots from "../../assets/HomePhoto/Slots.png";
import Sports from "../../assets/HomePhoto/Sports.png";
import Crash from "../../assets/HomePhoto/Crash.png";

import { AuthContext } from "../../context/auth";
import { FaApple, FaAndroid } from "react-icons/fa";

import elite from "../../assets/MESTRE.png";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { TbCards } from "react-icons/tb";
import { RiLiveLine } from "react-icons/ri";

import AnalystImg from "../../assets/user.jpg";

import Roleta from "../../assets/games/roleta.png";
import BacBo from "../../assets/games/bacbo.webp";
import Dragon from "../../assets/games/dragon-tigger.webp";
import Football from "../../assets/games/football-studio.webp";
import Crazy from "../../assets/games/crazy-time.webp";

import Modal from "react-modal";

import api from "../../config/api";

Modal.setAppElement("#root");

const GlobalStyle = createGlobalStyle`
  body {
    position: fixed;   // Fixa a posição do corpo
    width: 100vw;      // Define a largura para a largura da viewport
    height: 100vh;     // Define a altura para a altura da viewport
    overflow: auto;    // Permite rolagem se necessário
    overflow-x: hidden;// Impede a rolagem horizontal
    font-family: "Roboto", sans-serif; /* Adicionado */
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent !important;
  }
`;

const blinkAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    
  }
`;

const CustomButton = styled.button`
  background-image: url(${elite});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 170px;
  padding: 32px 0;
  margin-bottom: 200px;
  background-color: #56cca100;
  border: none;
  cursor: pointer;
  &.blink-button {
    animation: ${blinkAnimation} 0.8s linear infinite;
  }
`;
const InstallButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -210px; // Margem negativa para mover para cima
  margin-bottom: 250px;
`;

const InstallButton = styled.a`
  padding: 15px 20px;
  margin: 0 10px;
  background-color: #9cff000d;
  border: 1px solid #9cff0020;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  color: #14b1a4; // Define a cor do texto
  display: flex; // Adicionado para alinhar ícone e texto horizontalmente
  align-items: center;
  justify-content: center;

  box-shadow: 0px 0px 10px rgba(0, 0, 255, 0.3);

  &:hover {
    background-color: #333;
  }
  @media (max-width: 720px) {
    // Estilos para telas até 720px de largura
    font-size: 10px; // Diminui o tamanho da fonte
    padding: 10px 15px; // Reduz o padding para o botão ficar menor
  }

  &:first-child {
    // Estilo específico para o botão iOS
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-right: 20px;
  }

  &:last-child {
    // Estilo específico para o botão Android
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-left: 20px;
  }
`;
const CustomButton1 = styled.button`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 170px;
  padding: 32px 0;
  margin-bottom: 100px;
  background-color: #56cca100;
  border: none;
  cursor: pointer;
  &.blink-button {
    animation: ${blinkAnimation} 1.5s linear infinite;
  }
`;

const Home = () => {
  const tropaArray = ['spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse','spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse','spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse','spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse']
  const [currentBanner, setCurrentBanner] = useState(0);
  const { user, games, gamesApi, greenRed } = useContext(AuthContext);
  const [playersCount, setPlayersCount] = useState(getRandomPlayers());
  const [increasing, setIncreasing] = useState(true); // State to check if the count is increasing or decreasing
  const initialPlayers = Array(6).fill().map(() => getRandomPlayers(253, 947));
  const [playersCounts, setPlayersCounts] = useState(initialPlayers);
      // Função para obter um número aleatório de jogadores
      function getRandomPlayers(min = 0, max = 947) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      useEffect(() => {
        const updatePlayers = () => {
          setPlayersCounts(prevCounts => {
            return prevCounts.map(count => {
              let newCount = count + (Math.random() > 0.5 ? 1 : -1);
              if (newCount > 947) return 947;
              if (newCount < 253) return 253;
              return newCount;
            });
          });
        };
    
        const interval = setInterval(updatePlayers, 20000); // Atualizar a cada 1 segundo
    
        return () => clearInterval(interval);
      }, []);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const [modalType, setModalType] = useState(null); // Estado para determinar o tipo de modal ('iOS' ou 'Android')
  const navigate = useNavigate();
  const handleGameClick = (game) => {
    if (game === "Crash") {
      navigate("/crashHome");
    }
    if (game === "Slots") {
      navigate("/slotsHome");
    }
    if (game === "Sports") {
      navigate("/sportsHome");
    }
  };

  const openModal = (type) => {
    setModalType(type); // Define o tipo de modal
    setShowModal(true); // Mostra o modal
  };

  const closeModal = () => {
    setShowModal(false); // Esconde o modal
  };

  const sports = ()=>{
    toast.warning("Disponível em breve...")
  }

  const [greenRoletas, setGreenRoletas] = useState(0);
  const [redRoletas, setRedRoletas] = useState(0);

  const [greenBacBo, setGreenBacBo] = useState(0);
  const [redBacBo, setRedBacBo] = useState(0);

  const [greenDragonTiger, setGreenDragonTiger] = useState(0);
  const [redDragonTiger, setRedDragonTiger] = useState(0);

  const [greenCrazyTime, setGreenCrazyTime] = useState(0);
  const [redCrazyTime, setRedCrazyTime] = useState(0);

  const [greenFootballStudio, setGreenFootballStudio] = useState(0);
  const [redFootballStudio, setRedFootballStudio] = useState(0);

  useEffect(() =>{
    function greensAndReds(){

      if(games){
        setGreenRoletas(games.values[0].green)
        setRedRoletas(games.values[0].red)

        setGreenBacBo(games.values[1].green)
        setRedBacBo(games.values[1].red)

        setGreenDragonTiger(games.values[2].green)
        setRedDragonTiger(games.values[2].red)

        setGreenCrazyTime(games.values[3].green)
        setRedCrazyTime(games.values[3].red)

        setGreenFootballStudio(games.values[4].green)
        setRedFootballStudio(games.values[4].red)

      }
    }
    greensAndReds()
  }, [games])

  useEffect(() => {
    // Configure a troca automática de banners a cada 5 segundos
    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner === 0 ? 1 : 0));
    }, 5000);

    // Limpe o intervalo quando o componente for desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container>
        <Titulo>Com quais jogos você deseja lucrar hoje?</Titulo>

        <GamesCircle>
          <GameCircle
            name="Crash"
            bgImage={Crash}
            onClick={() => handleGameClick("Crash")}
          />

          <GameCircle
            name="Cassino"
            bgImage={Cassino}
            onClick={() => handleGameClick("Cassino")}
          >
            <TbCards color="#D3D3D3" size={30} />
          </GameCircle>
          <GameCircle
            name="Slots"
            bgImage={Slots}
            onClick={() => handleGameClick("Slots")}
          >
            <BsFillRocketTakeoffFill color="#D3D3D3" size={30} />
          </GameCircle>
          <GameCircle
            name="Sports"
            bgImage={Sports}
            onClick={() => sports()}
          >
            <TbCards color="#D3D3D3" size={30} />
          </GameCircle>
        </GamesCircle>

        <Operations>
          <OperationsHeader>
            <OperationsTitle>ESCOLHA A SALA QUE DESEJA ENTRAR</OperationsTitle>
          </OperationsHeader>
          <OperationsMain>
            <OperationsMainHeader>
              <OperationsMainSubtitle>
                <Topic color="yellow" />
                <OperationsMainSubtitleTxt color="yellow">
                  Possível Entrada
                </OperationsMainSubtitleTxt>
              </OperationsMainSubtitle>
              <OperationsMainSubtitle>
                <Topic color="green" />
                <OperationsMainSubtitleTxt color="green">
                  Entrada confirmada
                </OperationsMainSubtitleTxt>
              </OperationsMainSubtitle>
            </OperationsMainHeader>

            <OperationsMainCards>
            {gamesApi.map((element, index) =>
                element.category === 1 ? ( // Verifica se o jogo pertence à categoria "Crash"
                <Cards
                key={index}
                  Pro={!element.all ? user.pro === 1 ? true : false : element.all}
                  AnalystPhoto={AnalystImg}
                  AnalystBandeira={element.analyst_id.bandeira}
                  NameAnalyst={element.analyst_id.name}
                  Players={playersCounts[index]}
                  NumberGreen={greenRed[`${tropaArray[index]}`] ? parseInt(greenRed[`${tropaArray[index]}`].win) : 0}
                  NumberRed={greenRed[`${tropaArray[index]}`] ? parseInt(greenRed[`${tropaArray[index]}`].loss) : 0}
                  CardImg={element.gameImg}
                  LinkGame={`${element.analyst_id.link_analyst}/${element.id}`} // Adicione o ID ao final da rota
                />
                ) : null
              )}
              {/* <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false }
                AnalystPhoto={AnalystImg}
                NameAnalyst="Breno Santiago"
                     Players={playersCounts[1]}
                NumberGreen={greenBacBo}
                NumberRed={redBacBo}
                CardImg={BacBo}
                LinkGame="/bacbo"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false }
                AnalystPhoto={AnalystImg}
                NameAnalyst="Vitoria Profaci"
                     Players={playersCounts[2]}
                NumberGreen={greenDragonTiger}
                NumberRed={redDragonTiger}
                CardImg={Dragon}
                LinkGame="/dragon"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false }
                AnalystPhoto={AnalystImg}
                NameAnalyst="Sandro Silva"
                     Players={playersCounts[3]}
                NumberGreen={greenCrazyTime}
                NumberRed={redCrazyTime}
                CardImg={Crazy}
                LinkGame="/crazy"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false }
                AnalystPhoto={AnalystImg}
                NameAnalyst="Marcela Matias"
                     Players={playersCounts[4]}
                NumberGreen={greenFootballStudio}
                NumberRed={redFootballStudio}
                CardImg={Football}
                LinkGame="/football"
              /> */}
            </OperationsMainCards>
              {
            user.pro === 1 || user.admin === 1 ? <CustomButton1></CustomButton1> : (
              <a href="https://go.perfectpay.com.br/PPU38CNB924?&utm_source=app&utm_medium=home" target="_blank" rel="noopener noreferrer">
              <CustomButton className="blink-button"></CustomButton>
            </a>
            ) 
          }
          </OperationsMain>
          <InstallButtonContainer>
            <InstallButton href="#" onClick={() => openModal("iOS")}>
              <FaApple size={20} style={{ marginRight: "10px" }} />
              Instalar no iPhone
            </InstallButton>
            <InstallButton href="#" onClick={() => openModal("Android")}>
              <FaAndroid size={20} style={{ marginRight: "10px" }} />
              Instalar no Android
            </InstallButton>

            {showModal && (
              <InstallModal type={modalType} onClose={closeModal} />
            )}
          </InstallButtonContainer>
        </Operations>
      </Container>
      <Menu />
    </>
  );
};

export default Home;
