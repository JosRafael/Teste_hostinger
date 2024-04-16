import React, { createContext, useState, useEffect } from "react";
import api from "../config/api";
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDeposito, setModalDeposito] = useState(false);
  const [modalSaque, setModalSaque] = useState(false);
  const [modalRoleta, setModalRoleta] = useState(true);
  const [modalRoletaPromo, setModalRoletaPromo] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [user, setUser] = useState(null);
  const [greenRed, setGreenRed] = useState([]);

  const [loading, setLoading] = useState(true);

  const key = "cryptoneobet";

  const [games, setGames] = useState();


  useEffect(() => {
    setLoading(true);
    async function loggedd() {
      const encryptedData = localStorage.getItem("encryptedData");

      if (encryptedData) {

        const decryptedJsonData = decryptData(encryptedData, "cryptoneobet");

        await api.post("/users/token", {
          token: decryptedJsonData.token,
        })
          .then((response) => {
            if (response.data.valid) {
              setUser(decryptedJsonData);
              setLoading(false);
            } else {
              logout();
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })

      } else {
        console.log("Nenhum dado criptografado encontrado.");
        setLoading(false);
      }
    }

    function primeiro_acesso() {
      const encryptedData = localStorage.getItem("logged");

      if (user) {
        if (encryptedData === user.email) {
          setLogged(user.email);
          setLoading(false);
        } else {
          setLogged(null);
          localStorage.removeItem("logged");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loggedd();
    primeiro_acesso();
  }, [user?.email]);

  useEffect(() => {
    async function getRedGreen() {
      await axios.post('https://tropadabet.com/api/', {
        "info": "placares"
      }).then((response) => {
        setGreenRed(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
    getRedGreen()
  }, [])

  const [gamesApi, setGamesApi] = useState([])

  useEffect(() => {
    async function getGames() {
      await api.get("/games").then((response) => {
        setGamesApi(response.data);
      }).catch((error) => {
        console.log("Error", error)
      })
    }
    getGames()
  }, [])

  // Função para criptografar dados JSON
  const encryptData = (jsonData, key) => {
    const jsonStr = JSON.stringify(jsonData);
    const encrypted = CryptoJS.AES.encrypt(jsonStr, key).toString();
    return encrypted;
  };

  // Função para descriptografar dados JSON
  const decryptData = (encryptedData, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedJsonStr = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedJsonStr);
  };

  function storageUser(data) {
    try {
      const encryptedData = encryptData(data, key);
      localStorage.setItem("encryptedData", encryptedData);
    } catch (error) {
      console.log("Erro ao analisar os dados JSON.");
    }
  }

  async function login(email) {
    setLoading(true);
    await api
      .post("/users/login", {
        email: email,
      })
      .then((response) => {
        setUser(response.data);
        storageUser(response.data);

        if (logged === response.data.email) {
          setLoading(false);
          toast.success("Seja bem-vindo!");
        } else {
          toast.warning("Faça o login na casa!");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        error && toast.error("Email não cadastrado!");
      });
  }
  async function cadastro(email, name, telefone) {
    setLoading(true);
    await api
      .post("/users", {
        email: email,
        name: name,
        telefone: telefone
      })
      .then((response) => {
        setUser(response.data);
        storageUser(response.data);

        if (logged === response.data.email) {
          setLoading(false);
          toast.success("Seja bem-vindo!");
        } else {
          toast.warning("Faça o login na casa!");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        error && toast.error("Email não cadastrado!");
      });
  }

  async function logout() {
    setLoading(true);
    localStorage.removeItem("encryptedData");
    localStorage.removeItem("bancaInicial");
    localStorage.removeItem("estiloJogador");
    setUser(null);

    setTimeout(function () {
      setLoading(false);
    }, 2000);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        cadastro,
        logout,
        logged,
        user,
        modalSaque,
        setModalSaque,
        modalDeposito,
        setModalDeposito,
        setLogged,
        modal,
        setModal,
        isHome,
        setIsHome,
        loading,
        modalRoleta,
        setModalRoleta,
        modalRoletaPromo,
        setModalRoletaPromo,
        games,
        gamesApi,
        greenRed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;