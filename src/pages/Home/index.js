import React, { useEffect, useState, useContext } from "react";
import {
  Container,
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
} from "./styles";

import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import GameCircle from "../../components/Games/Circle";
import Cards from "../../components/Games/Cards";
import PromoWheel from '../../components/PromoRoleta'; // Certifique-se de corrigir esse caminho para o local correto
import InstallModal from '../../components/InstallModal';  // Atualize o caminho para o arquivo do modal
import { useNavigate } from 'react-router-dom';
import api from "../../config/api";
import { toast } from "react-toastify";

import Pix from "../../components/Pix/Card";
import styled, { createGlobalStyle, keyframes } from "styled-components";

import Cassino from "../../assets/HomePhoto/Roleta.png";
import Slots from "../../assets/HomePhoto/Slots.png";
import Sports from "../../assets/HomePhoto/Sports.png";
import Crash from "../../assets/HomePhoto/Crash.png";

import { AuthContext } from "../../context/auth";
import { FaApple, FaAndroid, FaHeadphonesAlt } from 'react-icons/fa';

import elite from "../../assets/MESTRE.png";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { TbCards } from "react-icons/tb";
import AnalystImg from "../../assets/user.jpg";
import Modal from 'react-modal';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');

const GlobalStyle = createGlobalStyle`
  body {
    position: fixed;   // Fixa a posição do corpo
    width: 100vw;      // Define a largura para a largura da viewport
    height: 100vh;     // Define a altura para a altura da viewport
    overflow: auto;    // Permite rolagem se necessário
    overflow-x: hidden;// Impede a rolagem horizontal
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
    animation: ${blinkAnimation} 1.5s linear infinite;
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

const InstallButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
  @media (max-width: 720px) { // Estilos para telas até 720px de largura
    font-size: 10px;  // Diminui o tamanho da fonte
    padding: 10px 15px;  // Reduz o padding para o botão ficar menor
  }

  &:first-child { // Estilo específico para o botão iOS
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-right: 20px;
  }

  &:last-child { // Estilo específico para o botão Android
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-left: 20px;
  }
`;
const ButtonSuporte = styled.a`
  padding: 15px 20px;
  margin: 7px 10px;
  width: 80%;
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
  @media (max-width: 720px) { // Estilos para telas até 720px de largura
    font-size: 10px;  // Diminui o tamanho da fonte
    padding: 10px 15px;  // Reduz o padding para o botão ficar menor
  }

  &:first-child { // Estilo específico para o botão iOS
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-right: 20px;
  }

  &:last-child { // Estilo específico para o botão Android
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding-left: 20px;
  }
`;

const Home = () => {
  const { user, gamesApi, greenRed } = useContext(AuthContext);

  const tropaArray = ['spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse', 'spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse', 'spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse', 'spaceman01va', 'roletabrasileira', 'spaceman0115x', 'roletaxxxtreme', 'bacbo', 'mines', 'footballstudio', 'dragontiger', 'fortuneox', 'fortunemouse']
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  // Estado para o número de jogadores

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

  const sports = () => {
    toast.warning("Disponível em breve...")
  }

  const handleGameClick = (game) => {
    if (game === 'Crash') {
      navigate('/crashHome');
    }
    if (game === 'Cassino') {
      navigate('/cassinoHome');
    }
    if (game === 'Slots') {
      navigate('/slotsHome');
    }
    if (game === 'Sports') {
      navigate('/sportsHome');
    }
  };

  const openModal = (type) => {
    setModalType(type);   // Define o tipo de modal
    setShowModal(true);   // Mostra o modal
  };

  const closeModal = () => {
    setShowModal(false);  // Esconde o modal
  };



  const [showWheel, setShowWheel] = useState(false);
  <button onClick={() => setShowWheel(true)}>Mostrar Roleta</button>


  const [banners, setBanners] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };


  useEffect(() => {
    async function getBanners() {
      api.get('/home', {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }).then((response) => {
        setBanners(response.data);
      }).catch((error) => {
        console.error(error)
      })
    }

    getBanners()
  }, [user.token])


  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container>
        <Slider {...settings}>
          {banners.map((imagem, index) => (
            <div key={index}>
              <a href={imagem.link}>
                <img
                  src={imagem.banner}
                  alt={imagem}
                  style={{ width: '100%', height: '210px', objectFit: 'cover' }}
                />
              </a>
            </div>
          ))}
        </Slider>

        <Pix />
        <Titulo>Com quais jogos você deseja lucrar hoje?</Titulo>

        <GamesCircle>
          <GameCircle name="Crash" bgImage={Crash} onClick={() => handleGameClick('Crash')} />

          <GameCircle name="Cassino" bgImage={Cassino} onClick={() => handleGameClick('Cassino')}>
            <TbCards color="#D3D3D3" size={30} />
          </GameCircle>
          <GameCircle name="Slots" bgImage={Slots} onClick={() => handleGameClick('Slots')}>
            <BsFillRocketTakeoffFill color="#D3D3D3" size={30} />
          </GameCircle>
          <GameCircle name="Sports" bgImage={Sports} onClick={() => sports()}>
            <TbCards color="#D3D3D3" size={30} />
          </GameCircle>
        </GamesCircle>

        <Operations>
          <OperationsHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="40px"
              height="40px"
            >
              <circle cx="24" cy="24" r="6" fill="#f44336"></circle>
              <path
                fill="#f44336"
                d="M17.09,16.789L14.321,13.9C11.663,16.448,10,20.027,10,24s1.663,7.552,4.321,10.1l2.769-2.889 C15.19,29.389,14,26.833,14,24C14,21.167,15.19,18.61,17.09,16.789z"
              ></path>
              <path
                fill="#f44336"
                d="M33.679,13.9l-2.769,2.889C32.81,18.611,34,21.167,34,24c0,2.833-1.19,5.389-3.09,7.211l2.769,2.889 C36.337,31.552,38,27.973,38,24S36.337,16.448,33.679,13.9z"
              ></path>
              <g>
                <path
                  fill="#f44336"
                  d="M11.561,11.021l-2.779-2.9C4.605,12.125,2,17.757,2,24s2.605,11.875,6.782,15.879l2.779-2.9 C8.142,33.701,6,29.1,6,24S8.142,14.299,11.561,11.021z"
                ></path>
                <path
                  fill="#f44336"
                  d="M39.218,8.121l-2.779,2.9C39.858,14.299,42,18.9,42,24s-2.142,9.701-5.561,12.979l2.779,2.9 C43.395,35.875,46,30.243,46,24S43.395,12.125,39.218,8.121z"
                ></path>
              </g>
            </svg>
            <OperationsTitle>Salas de operações ao vivo</OperationsTitle>
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
              {
                gamesApi.map((element, index) => (
                  element.home === 1 ? (

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
                ))
              }


              {/*  {gamesApi.map((element, index) =>
            
              // teste = greenRed[`${tropaArray[0]}`]
               // console.log(teste && teste.win)
         
                element.index === 1 ? (
                  <Cards
                  key={index}
                    Pro={!element.all ? user.pro === 1 ? true : false : element.all}
                    AnalystPhoto={AnalystImg}
                    NameAnalyst={element.analyst_id.name}
                    Players={playersCounts[index]}
                    NumberGreen={greenRoletas}
                    NumberRed={10}
                    //NumberRed={parseInt(greenRed[`${tropaArray[index]}`].loss)}
                    CardImg={element.gameImg}
                    LinkGame={`${element.analyst_id.link_analyst}/${element.id}`} // Adicione o ID ao final da rota
                  />
                ) : null
              )} */}


              {/* <Cards
                Pro={true}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Luis Filipe"
                Players={playersCounts[0]}
                NumberGreen={greenRoletas}
                NumberRed={redRoletas}
                CardImg={Roleta}
                LinkGame="/roletas"
              />
              <Cards
                Pro={true}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Eduardo Rubert"
                Players={playersCounts[3]}
                NumberGreen={greenAviator}
                NumberRed={redAviator}
                CardImg={Aviator}
                LinkGame="/aviator"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Manoela Cecílio"
                Players={playersCounts[5]}
                NumberGreen={greenSpaceman}
                NumberRed={redSpaceman}
                CardImg={Spaceman}
                LinkGame="/spaceVelas"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Vitoria Profaci"
                Players={playersCounts[2]}
                NumberGreen={greenDragonTiger}
                NumberRed={redDragonTiger}
                CardImg={Dragon}
                LinkGame="/dragon"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Marcela Matias"
                Players={playersCounts[4]}
                NumberGreen={greenFootballStudio}
                NumberRed={redFootballStudio}
                CardImg={Football}
                LinkGame="/football"
              />
              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Breno Santiago"
                Players={playersCounts[1]}
                NumberGreen={greenBacBo}
                NumberRed={redBacBo}
                CardImg={BacBo}
                LinkGame="/bacbo"
              />
              <Cards
                Pro={true}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Natale Colombo"
                Players={playersCounts[1]}
                NumberGreen={greenMines}
                NumberRed={redMines}
                CardImg={Mines}
                LinkGame="/mines"
              />
              <Cards
                Pro={true}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Clarisse Souza"
                Players={playersCounts[2]}
                NumberGreen={greenTiger}
                NumberRed={redTiger}
                CardImg={Fortune}
                LinkGame="/tiger"
              />

              <Cards
                Pro={user.pro === 1 ? true : false || user.admin === 1 ? true : false}
                AnalystPhoto={AnalystImg}
                NameAnalyst="Júlia Fonseca"
                Players={playersCounts[4]}
                NumberGreen={greenAviatorVA}
                NumberRed={redAviatorVA}
                CardImg={AviatorAltas}
                LinkGame="/aviatorVelas"
              /> */}

            </OperationsMainCards>
          </OperationsMain>
          {
            user.pro === 1 || user.admin === 1 ? <CustomButton1></CustomButton1> : (
              <a href="https://go.perfectpay.com.br/PPU38CNB924?&utm_source=app&utm_medium=home" target="_blank" rel="noopener noreferrer">
                <CustomButton className="blink-button"></CustomButton>
              </a>
            )
          }

          <InstallButtonContainer>
            <InstallButton href="#" onClick={() => openModal('iOS')}>
              <FaApple size={20} style={{ marginRight: '10px' }} />
              Instalar no iPhone
            </InstallButton>
            <InstallButton href="#" onClick={() => openModal('Android')}>
              <FaAndroid size={20} style={{ marginRight: '10px' }} />
              Instalar no Android
            </InstallButton>
            <ButtonSuporte href="https://wa.me/5511981259477?text=Olá,%20queria%20tirar%20uma%20dúvida!">
              <FaHeadphonesAlt size={20} style={{ marginRight: '10px' }} />
              Suporte Neobet
            </ButtonSuporte>
            {showModal && <InstallModal type={modalType} onClose={closeModal} />}
            <PromoWheel show={showWheel} onClose={() => setShowWheel(false)} />

          </InstallButtonContainer>
        </Operations>
      </Container>
      <Menu />

    </>
  );
};

export default Home;