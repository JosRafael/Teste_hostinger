// Card.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Tiger from "../../assets/games/fortune.webp"
import Aviator from "../../assets/games/aviator.webp"
import Aviator2x from "../../assets/games/aviator-2x.webp"
import AviatorVA from "../../assets/games/aviatorAltas.webp"
import Spaceman from "../../assets/games/spaceman-15x.webp"
import Spaceman2x from "../../assets/games/spaceman-2x.webp"
import SpacemanVA from "../../assets/games/spacemanAltas.webp"
import FortuneOx from "../../assets/games/fortune-ox.webp"
import Mines from "../../assets/games/mines-3x.webp"
import Football from "../../assets/games/football-studio.webp"
import Crazzy from "../../assets/games/crazy-time.webp"
import Mouse from "../../assets/games/fortune-mouse.webp"
import Rabbit from "../../assets/games/fortune-rabbit.webp"
import DragonTiger from "../../assets/games/dragon-tigger.webp"
import Roleta from "../../assets/games/roleta.webp"
import BacBo from "../../assets/games/bacbo.webp"

// Funções para gerar dados aleatórios
const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString().replace(/\d{3}$/, '***');
};

const generateRandomWinAmount = () => {
  const amount = (Math.random() * (299 - 10) + 10).toFixed(2);
  return `$ ${amount}`;
};

// Animação de fade in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Componentes de estilo
const CardContainer = styled.div`
  background-color: rgba(20, 177, 164, 0.35); /* Alterei para a cor #14b1a4 com opacidade */
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  margin: 15px 0;
  border-radius: 10px; /* Aumentei o raio do border-radius */
  position: relative;
  opacity: 0; /* Inicialmente invisível */
  animation: ${fadeIn} 0.5s ease forwards; /* Animação de fade in */
`;

const GameLogo = styled.div`
  background-image: url('${props => props.logoUrl}');
  background-size: cover;
  border-radius: 10px 0;
  left: 0px;
  height: 100%;
  position: absolute;
  width: 80px;
  z-index: 1;
`;


const GameInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column; // Organiza os itens em uma coluna
  justify-content: center; // Centraliza o conteúdo verticalmente
  align-items: start; // Alinha itens à esquerda
  margin-left: 88px; // Espaço para o logotipo mais um pequeno espaço extra
`;

const Congratulations = styled.div`
  font-size: 0.9em;
  margin-bottom: 5px;
  color: #c9c9c9;
`;

const PlayerInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
`;

const SubTitle = styled.div`
  font-size: 0.7em;
  margin-top: 5px;
  color: #c9c9c9;
`;
// Objeto que mapeia títulos de jogos para URLs de imagens
const gameImages = {
  'Roleta': Roleta,
  'Aviator': Aviator,
  'Aviator 2x': Aviator2x,
  'Aviator VA': AviatorVA,
  'Spaceman': Spaceman,
  'Spaceman 2x': Spaceman2x,
  'Spaceman VA': SpacemanVA,
  'BacBo': BacBo,
  'FortuneOx': FortuneOx,
  'Mines': Mines,
  'Football': Football,
  'Crazy': Crazzy,
  'FortuneMouse': Mouse,
  'FortuneRabbit': Rabbit,
  'DragonTiger': DragonTiger,
  'fortune': Tiger
};
const Card = () => {
  const [userId, setUserId] = useState(generateRandomId());
  const [winAmount, setWinAmount] = useState(generateRandomWinAmount());

  // Adicione um estado para a URL da imagem do jogo
  const [logoUrl, setLogoUrl] = useState('');
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    setUserId(generateRandomId());
      setWinAmount(generateRandomWinAmount());
      const gameTitles = Object.keys(gameImages);
      const randomGameKey = gameTitles[Math.floor(Math.random() * gameTitles.length)];
      setLogoUrl(gameImages[randomGameKey]);
      setSubTitle(randomGameKey);
      
    const interval = setInterval(() => {
      setUserId(generateRandomId());
      setWinAmount(generateRandomWinAmount());
      const gameTitles = Object.keys(gameImages);
      const randomGameKey = gameTitles[Math.floor(Math.random() * gameTitles.length)];
      setLogoUrl(gameImages[randomGameKey]);
      setSubTitle(randomGameKey);
    }, 3000); // Novo card a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <CardContainer>
      <GameLogo logoUrl={logoUrl} />
      <GameInfo>
        <Congratulations>Parabéns!</Congratulations>
        <PlayerInfo>{userId} Ganhou {winAmount}</PlayerInfo>
        <SubTitle>{subTitle}</SubTitle>
      </GameInfo>
    </CardContainer>
  );
};

export default Card;
