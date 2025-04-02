import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import GameMenu from './pages/Game/GameMenu';
import LevelPage from "./pages/Game/LevelPage";
import Game from './pages/Game/Game';
import Instructions from './pages/Instructions';
import Score from './pages/Game/Score';  // ✅ Importing the new Score Page

const App = () =>  
    <Router>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game-menu" element={<GameMenu />} />
        <Route path="/level" element={<LevelPage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/int" element={<Instructions />} />
        <Route path="/score" element={<Score />} />  {/* ✅ Added Score Page Route */}
      </Routes>
    </Router>

export default App;
