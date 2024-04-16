import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import { Container } from "./styles";

const GlobalStyle = createGlobalStyle`
  body {
    height: calc(100vh - 15px);
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
`;

const TextContainer = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
  font-family: ubuntu, Sans-serif;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.5em;
`;

const SubTextContainer = styled.div`
  color: #14b1a4;
  font-family: Verdana, Sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  text-align: center;
  margin-bottom: 25px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    margin-left: 25px;
  }

  input,
  select {
    color: white;
    border: none;
    padding: 0 12px;
    border-radius: 25px;
    margin: 6px 0px;
    background: #ffffff2e;
    outline: none;
    height: 42px;
    width: 85%;
    margin-left: 15px;
    font-size: 16px;
  }
`;

const InputContainer1 = styled(InputContainer)`
  input {
    width: 90%;
    margin-left: 16px;
  }
`;

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const Tutorial = () => {
  const [bancaInicial, setBancaInicial] = useState("");
  const [estiloJogador, setEstiloJogador] = useState("");
  const [entradaRecomendada, setEntradaRecomendada] = useState("");
  const [stopWinRecomendado, setStopWinRecomendado] = useState("");
  const [stopLossRecomendado, setStopLossRecomendado] = useState("");

  useEffect(() => {
    // Recupera os valores do localStorage ao montar o componente
    const storedBancaInicial = localStorage.getItem("bancaInicial");
    const storedEstiloJogador = localStorage.getItem("estiloJogador");

    if (storedBancaInicial) setBancaInicial(storedBancaInicial);
    if (storedEstiloJogador) setEstiloJogador(storedEstiloJogador);
  }, []);

  // Função para calcular os valores recomendados
  const calcularValoresRecomendados = () => {
    if (estiloJogador && bancaInicial) {
      let bancaInicialValue = parseFloat(
        bancaInicial.replace(/[^\d,.]/g, "").replace(",", ".").replace("R$", "").trim()
      );

      switch (estiloJogador) {
        case "Conservador":
          setEntradaRecomendada(formatCurrency(bancaInicialValue * 0.03));
          setStopWinRecomendado(formatCurrency(bancaInicialValue * 0.05));
          setStopLossRecomendado(formatCurrency(bancaInicialValue * 0.15));
          break;
        case "Moderado":
          setEntradaRecomendada(formatCurrency(bancaInicialValue * 0.07));
          setStopWinRecomendado(formatCurrency(bancaInicialValue * 0.15));
          setStopLossRecomendado(formatCurrency(bancaInicialValue * 0.25));
          break;
        case "Agressivo":
          setEntradaRecomendada(formatCurrency(bancaInicialValue * 0.12));
          setStopWinRecomendado(formatCurrency(bancaInicialValue * 0.20));
          setStopLossRecomendado(formatCurrency(bancaInicialValue * 0.40));
          break;
        default:
          setEntradaRecomendada("");
          setStopWinRecomendado("");
          setStopLossRecomendado("");
          break;
      }
    }
  };

  // Use useEffect para observar mudanças em estiloJogador ou bancaInicial
  useEffect(() => {
    calcularValoresRecomendados();
    // Atualiza os valores no localStorage sempre que eles mudarem
    localStorage.setItem("bancaInicial", bancaInicial);
    localStorage.setItem("estiloJogador", estiloJogador);
  }, [estiloJogador, bancaInicial]);

  const handleBancaInicialChange = (e) => {
    let value = e.target.value;

    // Remove caracteres não numéricos, exceto a vírgula
    value = value.replace(/[^\d,]/g, "");

    // Remove todas as vírgulas, exceto a última
    value = value.replace(/,/g, "");

    // Adiciona uma vírgula como separador decimal, se ausente
    if (value.indexOf(",") === -1) {
      const decimalIndex = value.length - 2;
      value = value.slice(0, decimalIndex) + "," + value.slice(decimalIndex);
    }

    // Adiciona "R$" na frente do valor formatado
    const formattedValue = `R$ ${value}`;

    setBancaInicial(formattedValue);
  };

  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container style={{ marginTop: "60px" }}>
        <TextContainer>Planilha de gerenciamento</TextContainer>
        <SubTextContainer>
          Gerencie o valor de suas entradas com nossa planilha automática:
        </SubTextContainer>

        <InputContainer>
          <label>Estilo do Jogador:</label>
          <select
            value={estiloJogador}
            onChange={(e) => setEstiloJogador(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Conservador">Conservador</option>
            <option value="Moderado">Moderado</option>
            <option value="Agressivo">Agressivo</option>
          </select>
        </InputContainer>

        <InputContainer>
          <label>Saldo da Banca Inicial:</label>
          <input           
          type="text"
            keyboardType="numeric"
            value={bancaInicial}
            onChange={handleBancaInicialChange}
          />
        </InputContainer>

        {entradaRecomendada && (
          <div>
            <InputContainer>
              <label>Entrada Recomendada:</label>
              <input
                type="text"
                value={entradaRecomendada}
                readOnly
              />
            </InputContainer>
            <InputContainer>
              <label>Stop Win Recomendado:</label>
              <input
                type="text"
                value={stopWinRecomendado}
                readOnly
              />
            </InputContainer>
            <InputContainer1>
              <label>Stop Loss Recomendado:</label>
              <input
                type="text"
                value={stopLossRecomendado}
                readOnly
              />
            </InputContainer1>
          </div>
        )}
      </Container>
      <Menu />
    </>
  );
};

export default Tutorial;