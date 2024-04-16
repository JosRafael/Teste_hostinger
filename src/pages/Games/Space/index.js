import React, { useState, useEffect, useContext} from "react";
import {
  Container,
  General,
  Header,
  ImageHeader,
  Main,
  MainName,
  MainBody,
} from "./styles";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserImg from "../../../assets/user.jpg";
import styled from "styled-components";
import IframeComponent from "../../../components/Iframes";
import { AuthContext } from "../../../context/auth";
import LinkGame from "../../../config/linkGames.json";
import { useParams } from "react-router-dom";


const AnalystName = styled.span`
  color: #FFFFFF;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
  display: block;
`;

const EntryPatternMessage = styled.span`
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
  display: block;
`;

const Spaceman = () => {
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { id } = useParams();
  const { user, gamesApi } = useContext(AuthContext);
  const [game, setGame] = useState();

  useEffect(()=>{
    function getGame(){
      gamesApi.forEach(element => {
        if(element.id === id){
          setGame(element)
        }
      });
    }
    getGame()
  }, [id, gamesApi])

  const generateAviatorSignal = () => {
    const minEntry = 1.32;
    const maxEntry = 1.5;
    const randomEntry = (Math.random() * (maxEntry - minEntry) + minEntry).toFixed(2);
    const message = `Entrem no Spaceman com entrada de ${randomEntry}x até ${new Date().getHours()}:${(new Date().getMinutes() + 2) % 60}`;
    return message;
  };

  const startFlux = () => {
    setIsTyping(true);
    setMensagemAtual("Digitando...");

    setTimeout(() => {
      setIsTyping(false);
      const newMessage = generateAviatorSignal();
      setMensagemAtual(newMessage);
    }, 3000); // 3 segundos após "Digitando..."
  };

  useEffect(() => {
    startFlux();
    const intervalId = setInterval(startFlux, 100000); // 2 minuto

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <Link to="/crashHome">
        <AiOutlineArrowLeft color="#fff" size="32" />
      </Link>
      <General>
        <Header>
          <ImageHeader src={UserImg} alt="" />
        </Header>
        <Main>
          <MainName>
            <AnalystName>{game && game.analyst_id.name}</AnalystName>
          </MainName>
          <MainBody>
            {mensagemAtual === "Digitando..." && <span>Digitando...</span>}

            {mensagemAtual.includes("Entrem no Spaceman com entrada de") && (
              <EntryPatternMessage>{mensagemAtual}</EntryPatternMessage>
            )}
          </MainBody>
        </Main>
      </General>
      
      <IframeComponent link={game && game.link_iframe} />
    
    </Container>
  );
};

export default Spaceman;
