import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AuthContext } from "../../../context/auth";
import IframeComponent from "../../../components/Iframes/";
import PanelRoleta from "../BacboPanel";
import UserImg from "../../../assets/user.jpg";
import { useParams } from "react-router-dom";
import {
  Container,
  General,
  Header,
  ImageHeader,
  Main,
  MainMsg,
  MainName,
  MainBody,
  HighlightedText,
} from "./styles";

const BacBo = () => {
  const [game, setGame] = useState();
  const [currentStrategy, setCurrentStrategy] = useState("");
  const [mensagemAtual, setMensagemAtual] = useState("Analisando padrões...");
  const { id } = useParams();
  const { user, gamesApi } = useContext(AuthContext);
  const [entrada, setEntrada] = useState("");

  const getGame = useCallback(() => {
    gamesApi.forEach((element) => {
      if (element.id === id) {
        setGame(element);
      }
    });
  }, [gamesApi, id]);

  useEffect(() => {
    getGame();
  }, [getGame]);

  const fetchBacBoData = useCallback(async () => {
    try {
      const response = await axios.get("https://api-estrela.onrender.com/bacbo/ultimosNumeros");
      const ultimosNumeros = response.data.ultimosNumeros; // Ajuste conforme a estrutura da sua resposta
      const strategy = processarEstrategia(ultimosNumeros);
      setCurrentStrategy(strategy);
    } catch (error) {
      console.error("Erro ao buscar dados do BacBo:", error);
    }
  }, []);

  const processarEstrategia = useCallback((numeros) => {
  
    const frases = [
      "Estou buscando uma oportunidade...",
      "Traçando uma nova estratégia...",
      "Digitando...",
      "Investigando tendências",
      "Analisando próxima entrada..."
    ];
    const indiceSorteado = Math.floor(Math.random() * frases.length);

  switch (true) {
   case (numeros.length >= 2 && numeros[0] === "Player" && numeros[1] === "Banker" && numeros[2] === "Banker"):
      return "Deu Green!!! 🤑💰";

    case (numeros.length >= 2 && numeros[0] === "Banker" && numeros[1] === "Player" && numeros[2] === "Player"):
      return "Deu Green!!! 🤑💰";

    case (numeros.length >= 2 && numeros[0] === "Player" && numeros[1] === "Player"):
      return "Entrada confirmada no 🔴"; // Banco após dois "Player"

    case (numeros.length >= 2 && numeros[0] === "Banker" && numeros[1] === "Banker"):
      return "Entrada confirmada no 🔵"; // Player após dois "Banker"

    case (numeros.length >= 2 && numeros[0] === "Banker" && numeros[1] === "Player"):
      return frases[indiceSorteado]; // Player após dois "Banker"

    case (numeros.length >= 2 && numeros[0] === "Player" && numeros[1] === "Banker"):
      return frases[indiceSorteado];// Player após dois "Banker"

    case (numeros.length >= 2 && numeros[0] === "Tie"):
      return frases[indiceSorteado];
   
    default:
      return frases[indiceSorteado];
  }
}, []);

useEffect(() => {
  const intervalId = setInterval(() => {
    fetchBacBoData();
    setMensagemAtual("Digitando...");
  }, 10000);
  
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, [currentStrategy, fetchBacBoData]);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBacBoData();
      setMensagemAtual("Digitando...");
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchBacBoData]);

  return (
    <Container>
      <Link to="/cassinoHome">
        <AiOutlineArrowLeft color="#fff" size="32" />
      </Link>
      <General>
        <Header>
          <ImageHeader src={UserImg} alt="" />
        </Header>
        <Main>
          <MainMsg>
            <MainName>{game && game.analyst_id.name}</MainName>
            <MainBody>{currentStrategy || mensagemAtual}</MainBody>
          </MainMsg>
        </Main>
      </General>
      <PanelRoleta strategy={currentStrategy} />
      <IframeComponent link={game && game.link_iframe} />
    </Container>
  );
};

export default BacBo;