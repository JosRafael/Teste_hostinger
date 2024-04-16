import React, { useState, useEffect, useContext } from "react";
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
  const [entrada, setEntrada] = useState("")

  
  useEffect(() => {
    function getGame() {
      gamesApi.forEach((element) => {
        if (element.id === id) {
          setGame(element);
        }
      });
    }
    getGame();
  }, [id, gamesApi]);

  

  const fetchBacBoData = async () => {
    try {
      const response = await axios.get("https://api-estrela.onrender.com/bacbo/ultimosNumeros");
      const ultimosNumeros = response.data.ultimosNumeros; // Ajuste conforme a estrutura da sua resposta
  
      console.log("Últimos números recebidos:", ultimosNumeros); // Log dos números recebidos
      console.log(entrada)

     
        const strategy = processarEstrategia(ultimosNumeros);
        console.log("Estratégia determinada:", strategy); // Log da estratégia determinada
        setCurrentStrategy(strategy);
      

    } catch (error) {
      console.error("Erro ao buscar dados do BacBo:", error);
    }
  };
  const processarEstrategia = (numeros) => {
  
    const frases = [
      "Estou buscando uma oportunidade...",
      "Traçando uma nova estratégia...",
      "Digitando...",
      "Investigando tendências",
      "Analisando próxima entrada..."
    ];
    const indiceSorteado = Math.floor(Math.random() * frases.length);

    if(numeros[0] === entrada){
        setEntrada("")
        return "Deu Green!!! 🤑💰"; 
    } else if(numeros[0] === "Tie"){
      setEntrada("")
      return "Não foi dessa vez..."; 
    }

   
    // Verifica se os dois primeiros números são "Player"
    if (numeros.length >= 2 && numeros[0] === "Player" && numeros[1] === "Player") {
      if(numeros[0] === "Player" && numeros[1] === "Player" && numeros[2] === "Player"){
        if(numeros[0] === "Player" && numeros[1] === "Player" && numeros[2] === "Player" && numeros[3] === "Player"){
          setEntrada("Banker")
          return "Não perca essa chace... 🔴"; 
        } else{
          setEntrada("Banker")
          return "Forte chance 🔴"; // Banco após dois "Player"
        }
      }else{
        setEntrada("Banker")
        return "🔴"; // Banco após dois "Player"
      }

    }
    if (numeros.length >= 2 && numeros[0] === "Banker" && numeros[1] === "Banker") {
      if(numeros[0] === "Banker" && numeros[1] === "Banker" && numeros[2] === "Banker"){
        if(numeros[0] === "Banker" && numeros[1] === "Banker" && numeros[2] === "Banker" && numeros[3] === "Banker"){
          setEntrada("Player")
          return "Não perca essa chace... 🔵"; 
        } else{
          setEntrada("Player")
          return "Forte chance 🔵"; // Banco após dois "Player"
        }
      }else{
        setEntrada("Player")
        return "🔵"; // Banco após dois "Player"
      }

    }

    setEntrada("")
    return frases[indiceSorteado]
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBacBoData();
    }, 10000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBacBoData();
      setMensagemAtual("Digitando...");
    }, 10000); // Intervalo de 10 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

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