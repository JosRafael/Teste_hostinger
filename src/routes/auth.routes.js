import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Termos from "../pages/TermosDeUso";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import PosLogin from "../pages/Pos_Login";

import { AuthContext } from "../context/auth";

export default function AuthRoutes() {
  const { user, logged } = useContext(AuthContext);
  return (
    <Routes>
      {user && !logged ? (
        <>
          <Route index path="/" element={<PosLogin />} />
          <Route path="*" element={<PosLogin />} />
        </>
      ) : (
        <>
          <Route index path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </>
      )}

      <Route index path="/cadastro" element={<Cadastro />} />
      <Route index path="/termos" element={<Termos />} />
    </Routes>
  );
}
