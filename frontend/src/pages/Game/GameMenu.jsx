import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import GameMenuImage from "../../assets/menu1.jpg"; 

const GameMenu = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat"
      style={{
        backgroundImage: `url(${GameMenuImage})`,
        backgroundSize: "100%", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
      }}
    >
      <Navbar />

      <div className="flex flex-grow flex-col items-center justify-center space-y-6 p-10 rounded-lg">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8 drop-shadow-lg">
          Game Menu
        </h2>

        {/* Menu Buttons - Arranged Vertically */}
        <div className="flex flex-col space-y-4">
          <button
            className="w-60 text-black py-3 rounded-lg text-xl font-semibold hover:scale-105 shadow-lg transition duration-300"
            style={{ backgroundColor: '#b5a669' }}
            onClick={() => navigate("/level")}
          >
            New Game
          </button>
           <button
            className="w-60 text-black py-3 rounded-lg text-xl font-semibold hover:scale-105 shadow-lg transition duration-300"
            style={{ backgroundColor: '#b5a669' }}
            onClick={() => navigate("/score")}
          >
            Score
          </button>

          <button
            className="w-60 text-white py-3 rounded-lg text-xl font-semibold hover:scale-105 shadow-lg transition duration-300"
            style={{ backgroundColor: '#b5a669' }}
            onClick={() => navigate("/")}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
