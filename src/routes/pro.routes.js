import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Bonus from "../pages/Bonus";
import Termos from "../pages/TermosDeUso";
import Gerenciamento from "../pages/Gerenciamento";
import Tutorial from "../pages/Tutorial";
import Live from "../pages/Live";
import Pos_Login from "../pages/Pos_Login";
import Aviator from "../pages/Games/Aviator";
import Aviator2 from "../pages/Games/Aviator2x";
import AviatorVelas from "../pages/Games/AviatorVelas";

import Space from "../pages/Games/Space";
import Space2x from "../pages/Games/Space2x";
import SpaceVelas from "../pages/Games/SpaceVelas";

import Mines from "../pages/Games/Mines";
import Roletas from "../pages/Games/Roletas";
import Tiger from "../pages/Games/Tiger";
import FortuneOx from "../pages/Games/Fortune";
import Rabbit from "../pages/Games/Rabbit";
import Mouse from "../pages/Games/Mouse";

import Login from "../pages/Login"
import Bacbo from "../pages/Games/Bacbo"
import Dragon from "../pages/Games/DragonTiger"
import Football from "../pages/Games/Football"
import Crazy from "../pages/Games/Crazy"

import CrashHome from "../components/CrashHome"
import SlotsHome from "../components/SlotsHome"
import CassinoHome from "../components/CassinoHome"
import Indicar from "../pages/Indicar"
import SportsHome from "../components/SportsHome"
import PrivateRoute from './pro.routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />

      <Route index path="/bonus" element={<Bonus />} />
      
      <Route index path="/tutorial" element={<Tutorial />} />
      <Route index path="/indicar" element={<Indicar />} />
      <Route index path="/termos" element={<Termos />} />
      <Route index path="/lives" element={<Live />} />
      <Route index path="/gerenciamento" element={<Gerenciamento />} />

      <Route index path="/crashHome" element={<CrashHome />} />
      <Route index path="/cassinoHome" element={<CassinoHome />} />
      <Route index path="/slotsHome" element={<SlotsHome />} />
      {/* <Route index path="/sportsHome" element={<SportsHome />} /> */}
      
       {/* JGOSO AO VIVO // */}
      <Route index path="/bacbo/:id" element={<Bacbo />} />
      <Route index path="/dragon/:id" element={<Dragon />} />
      <Route index path="/football/:id" element={<Football />} />
      <Route index path="/crazy/:id" element={<Crazy />} />

      {/* JGOSO DE CRASH// */}
      <Route index path="/aviator/:id" element={<Aviator />} />
      <Route index path="/aviator2x/:id" element={<Aviator2 />} />
      <Route index path="/aviatorVelas/:id" element={<AviatorVelas />} />

      <Route index path="/space/:id" element={<Space />} />
      <Route index path="/space2x/:id" element={<Space2x />} />
      <Route index path="/spaceVelas/:id" element={<SpaceVelas />} />

      {/* OUTROS JOGOS// */}
      <Route index path="/mines/:id" element={<Mines />} />
      <Route index path="/roletas/:id" element={<Roletas />} />
      <Route index path="/tiger/:id" element={<Tiger />} />
      <Route index path="/fortuneOx/:id" element={<FortuneOx />} />
      {/* <Route index path="/mines3" element={<Mines />} /> */}
      <Route index path="/rabbit/:id" element={<Rabbit />} />
      <Route index path="/mouse/:id" element={<Mouse />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
