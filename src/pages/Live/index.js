import { React, useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Container } from "./styles";
import IframeRoleta from "../../components/Lives/iframeRoleta";
import YouTube from "react-youtube";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import api from "../../config/api";
import { AuthContext } from "../../context/auth";

import BannerPro from "../../assets/banners/BannerDisponível.webp";

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

const AdditionalText = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 90px;
  text-align: center;
  color: #fff;
  font-family: ubuntu, Sans-serif;
  font-size: 21px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.3em;
  z-index: 2;
`;

const AdditionalText1 = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
  color: #fff;
  font-family: ubuntu, Sans-serif;
  font-size: 21px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.3em;
  z-index: 2;
`;

const EmailTextContainer = styled.div`
  color: #14b1a4;
  font-family: Verdana, Sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  text-align: center;
`;

const EmailTextContainer1 = styled.div`
  color: #14b1a4;
  font-family: Verdana, Sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  text-align: center;
`;

const Image = styled.img`
  height: 220px;
  width: 700px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;  
const ContainerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;  

const AccessButton = styled.button`
  background-image: url(/wp-content/uploads/2023/08/acessar-login.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #ecbf41;
  border: none;
  width: 100%;
  height: 40px;
  /* Altura do botão */
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ecbf41;
    /* Cor do botão ao passar o mouse */
  }
`;

const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};



const Tutorial = () => {
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    async function getLinks() {
      await api.get("/lives",{
        headers: {
        'Authorization': 'Bearer ' + user.token
      }}).then((response)=>{
        
        setVideoUrl(response.data[0].link_youtube)
        setGameUrl(response.data[0].link_game)
        setAvailable(response.data[0].available)
      });
    }
    getLinks();
  },[user.token]);

  const [videoUrl, setVideoUrl] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [available, setAvailable] = useState();

  const videoId = extractVideoId(videoUrl);

  const opts = {
    height: "220  ",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav></Nav>
      <Container>
        <AdditionalText>Lives de Operações</AdditionalText>
        <EmailTextContainer className="elementor-1137 elementor-element elementor-element-a04ad91">
          Veja nossos analistas faturando ao vivo!
        </EmailTextContainer>
        <br /> <br />
   
        {
          available === true ? (
            <div>
            <YouTube videoId={videoId} opts={opts}/>
          </div>
          ) : user.pro === 1 ? (
          <div>
            <YouTube videoId={videoId} opts={opts} />
          </div>
          ) : <ContainerImage>

              <Image src={BannerPro} height={220} width={700} alt="" />
          </ContainerImage> 
        }
       
        <AdditionalText1>JOGUE AO VIVO! </AdditionalText1>
        <EmailTextContainer1 className="elementor-1137 elementor-element elementor-element-a04ad91">
          Faça suas operações sem mudar de página!
        </EmailTextContainer1>
        <br></br>
        <IframeRoleta link ={gameUrl}/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br/> <br/> <br/> <br/> <br/>
      </Container>
      <Menu></Menu>
    </>
  );
};

export default Tutorial;