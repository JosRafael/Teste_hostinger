import React, { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import YouTube from "react-youtube";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, ButtonClose, ButtonDiv } from "./styles";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";

import { AuthContext } from "../../context/auth";
import api from "../../config/api";


const AdditionalText = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center; /* centraliza o texto */
  color: #fff;
  font-family: ubuntu, Sans-serif;
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 80px;
  text-transform: uppercase;
  line-height: 1.3em;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 1px;
    text-align: center; /* assegura que o texto está centralizado em dispositivos menores */
    background-size: 100%;
    background-position: center;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  
  padding-left: 7px;
  margin-top: 5px; /* Espaço para o banner */
`;

const TextoPequeno = styled.label`
  display: flex;
  padding-left: 12px;
  margin-right: 50%;
  margin-top: 20px;
  color: #DCDDDF;
  font-size: 16px;
  margin-left: 5px; /* Afasta para a direita */
  
  margin-bottom: 10px; /* Adicione margem para distanciar os elementos */
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column; /* Alterado para uma coluna para permitir a rolagem vertical */
  overflow-y: auto; /* Adicionado overflow-y para rolagem vertical */
  scroll-snap-type: y mandatory; /* Define o tipo de rolagem vertical como obrigatório */
  width: 100%; /* Largura total do container */
  max-height: 600px; /* Altura máxima para limitar a rolagem vertical */
  min-height: 1px; /* Defina uma altura mínima para evitar o problema de fundo em branco */
  -webkit-overflow-scrolling: touch; /* Adiciona suporte para scroll suave em dispositivos iOS */
  position: relative;

`;

const BannerItem = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  cursor: pointer;
  display: flex;
  justify-content:center;
  align-items: center;
`;


const BannerImage = styled.img`
 max-width: 100%;
  height: auto;
  max-height: 130px;
  border-radius: 10px;
  margin-left: 5px;
  filter: ${(props) => (props.isPro ? 'grayscale(100%)' : 'none')};


`;

const EmailTextContainer = styled.div`
  color: #14b1a4;
  font-family: Verdana, Sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  text-align: center; /* centraliza o texto */
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

const VideoContainer = styled.div`
  border: 1px solid #ccc; /* Adicione uma borda sólida */
  border-radius: 10px; /* Adicione uma borda arredondada */
  max-width: 340px; /* Largura máxima do vídeo */

  @media (min-width: 768px) {
    max-width: 800px; /* Aumenta a largura máxima do vídeo para dispositivos de desktop */
  }
`;

const YouTubeWrapper = styled.div`
  border: 2px solid #ccc; /* Adicione uma borda sólida */
  max-width: 340px; /* Largura máxima do wrapper do vídeo */

  @media (min-width: 768px) {
    max-width: 640px; /* Aumenta a largura máxima do wrapper do vídeo para dispositivos de desktop */
  }
`;


const Tutorial = () => {
  const [currentIndexComecePorAqui, setCurrentIndexComecePorAqui] = useState(0);
  const [currentIndexMentalidadeEGestao, setCurrentIndexMentalidadeEGestao] = useState(0);
  const [currentIndexComoJogar1, setCurrentIndexComoJogar1] = useState(0);
  const [currentIndexComoJogar2, setCurrentIndexComoJogar2] = useState(0);
  const { user } = useContext(AuthContext);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [classesCategory, setClassesCategory] = useState();
  const [classes, setClasses] = useState();

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const url1 = '/classesCategory';
    const url2 = '/classes';

    const token = user.token;

    async function fazerRequisicoesSimultaneasComToken() {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}` // Incluindo o Bearer Token no cabeçalho
          }
        };

        const [resposta1, resposta2] = await Promise.all([
          api.get(url1, config),
          api.get(url2, config)
        ]);

        setClassesCategory(resposta1.data);
        setClasses(resposta2.data);
        setSelectedVideoId(resposta2.data[0].link_youtube)

        // Faça o que for necessário com os dados das respostas aqui
      } catch (erro) {
        console.error('Ocorreu um erro:', erro);
      }
    }


    fazerRequisicoesSimultaneasComToken();
  }, [user.token])



  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = (videoId) => {
    setSelectedVideoId(videoId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideoId(null);
    setModalIsOpen(false);
  };

  const isDesktop = window.innerWidth > 768;

  const opts = {
    height: isDesktop ? '450' : '400', // Altura do vídeo com base no tipo de dispositivo
    width: isDesktop ? '600' : '340', // Largura do vídeo com base no tipo de dispositivo
    playerVars: {
      autoplay: 1, // 0 para desativar a reprodução automática
    },
    style: {
      borderRadius: '15px', // Adicione uma borda arredondada
    }
  };
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container>
        <AdditionalText>
          TORNE-SE UM JUSTICEIRO <br />
        </AdditionalText>

        <EmailTextContainer className="elementor-1137 elementor-element elementor-element-a04ad91">
          Aulas em Construção...
        </EmailTextContainer>

        {
          classesCategory && classesCategory.map((element, item) => (
            <>
              <TextoPequeno>
                {element.title}
              </TextoPequeno>
              <CarouselContainer
                style={{ transform: `translateX(-${currentIndexComecePorAqui * 100}%)` }}
              >
                <BannerContainer>
                  {classes &&
                    classes.map((banner, index) => (
                      <BannerItem key={index}>
                        {user.pro === 1 ? (
                          classesCategory ? (
                            banner.classeCategory === classesCategory[item].id ? (
                              <BannerImage
                                src={banner.banner}
                                alt={`Banner ${index + 1}`}
                                onClick={() => openModal(banner.link_youtube)}
                              />
                            ) : null
                          ) : null
                        ) : (
                          classesCategory ? (
                            banner.classeCategory === classesCategory[item].id ? (
                              <BannerImage
                                src={banner.banner}
                                alt={`Banner ${index + 1}`}
                                onClick={() =>
                                  banner.available
                                    ? openModal(banner.link_youtube)
                                    : toast.warning("Aula disponível apenas para PRO!")
                                }
                                isPro={!banner.available && user.pro !== 1}
                              />
                            ) : null
                          ) : null
                        )}
                      </BannerItem>
                    ))}
                </BannerContainer>
              </CarouselContainer>
            </>
          ))
        }

        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      </Container>
      <Menu></Menu>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Vídeo do YouTube"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            background: 'none',
            overflow: 'hidden',
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            '@media (min-width: 768px)': {
              width: '70%', // Largura do modal para desktops
            },
            '@media (max-width: 767px)': {
              width: '90%', // Largura do modal para dispositivos móveis
            },
          },
        }}
      >
        <ButtonDiv>

          <ButtonClose onClick={() => closeModal()}>x</ButtonClose>
        </ButtonDiv>

        {selectedVideoId && (
          <YouTubeWrapper>
            <YouTube videoId={extractVideoId(selectedVideoId)} opts={opts} />
          </YouTubeWrapper>
        )}
      </Modal>
    </>
  );
};

export default Tutorial;