import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/Navbar.jsx"; 
import bgImage from "../assets/menu1.jpg"; 

const Instructions = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleStartGame = () => {
    navigate("/game-menu"); // ✅ Navigate to the game menu
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8 mt-10">
        <div className="bg-fixed bg-opacity-70 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-black-700 mb-6">
            Game Instructions
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to the Banana Math! The objective is to complete all the equations by filling in the missing numbers or operators. Here’s how to play:
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 text-2xl font-semibold text-#b5a669-600">1.</div>
              <p className="text-lg text-gray-700">
                The game board consists of mathematical equations with missing numbers or operators. Your task is to identify the missing elements by looking at the numbers and symbols.
              </p>
            </div>
            <div className="flex items-start">
              <div className="mr-4 text-2xl font-semibold text-#b5a669-600">2.</div>
              <p className="text-lg text-gray-700">
                There will be a number pad with digits and symbols for you to choose from. Click or tap on a number or symbol to select it.
              </p>
            </div>
            <div className="flex items-start">
              <div className="mr-4 text-2xl font-semibold text-#b5a669-600">3.</div>
              <p className="text-lg text-gray-700">
                Place the correct number or symbol in the empty space of the equation.
              </p>
            </div>
            <div className="flex items-start">
              <div className="mr-4 text-2xl font-semibold text-#b5a669-600">4.</div>
              <p className="text-lg text-gray-700">
                Once all the equations are correctly completed, you win the game and can move on to the next puzzle.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              className="bg-#b5a669-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105"
              style={{ backgroundColor: '#b5a669' }} 
              onClick={handleStartGame} // ✅ Call the navigation function on button click
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
