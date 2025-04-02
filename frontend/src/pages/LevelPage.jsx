import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import LevelImage from "../assets/menu1.jpg";

const LevelPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${LevelImage})` }}
    >
    
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center space-y-6 p-10 rounded-lg">
      <h2 className="text-4xl font-extrabold text-center text-black mb-8 drop-shadow-lg">Select Level</h2> 
        
     
        <div className="flex flex-col space-y-4">
          <button
            className="px-6 py-3 text-black rounded-lg text-xl font-semibold hover:scale-105 w-60 transition duration-300"
            style={{ backgroundColor: '#b5a669' }} 
            onClick={() => navigate("/game?level=easy")}
          >
            Easy
          </button>
          <button
            className="px-6 py-3 text-black rounded-lg text-xl font-semibold hover:scale-105 w-60 transition duration-300"
            style={{ backgroundColor: '#b5a669' }} 
            onClick={() => navigate("/game?level=medium")}
          >
            Medium
          </button>
          <button
            className="px-6 py-3 text-black rounded-lg text-xl font-semibold hover:scale-105 w-60 transition duration-300"
            style={{ backgroundColor: '#b5a669' }} 
            onClick={() => navigate("/game?level=hard")}
          >
            Hard
          </button>
        </div>

      
        <button
          className="px-6 py-3 text-white rounded-lg text-xl font-semibold hover:scale-105 w-60 transition duration-300"
          style={{ backgroundColor: '#b5a669' }} 
          onClick={() => navigate("/game-menu")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default LevelPage;