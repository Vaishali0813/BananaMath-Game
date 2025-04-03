import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import LevelImage from "../../assets/menu1.jpg";
import pause from "../../assets/pause.png";

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(null);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level") || "easy";
  const userName = queryParams.get("name") || "Player";

  const timerRef = useRef(null); 

  const setTimerBasedOnLevel = () => {
    if (level === "easy") return 30;
    if (level === "medium") return 20;
    if (level === "hard") return 15;
    return 30;
  };

  useEffect(() => {
    setTimeLeft(setTimerBasedOnLevel());
  }, [level]);

  const fetchGameData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php?out=csv&base64=yes");
      const data = await response.text();
      const [base64Image, solution] = data.split(",");
      setCurrentEquation({
        imageUrl: `data:image/png;base64,${base64Image}`,
        solution: parseInt(solution, 10),
      });
      setCorrectAnswer(parseInt(solution, 10));
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  useEffect(() => {
    if (!paused && timeLeft > 0 && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current); 
    }

    return () => clearInterval(timerRef.current); 
  }, [timeLeft, paused, isGameOver]);

  useEffect(() => {
    if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
      saveScoreAndNavigate();
    }
  }, [timeLeft, isGameOver]);

  const handleAnswerSubmit = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnswer("");
      fetchGameData();
    } else {
      alert("Wrong answer! Try again.");
      setAnswer("");
    }
  };

  const saveScoreAndNavigate = () => {
    const allScores = JSON.parse(localStorage.getItem("scores")) || {};
    const userScores = allScores[userName] || [];
    const updatedScores = [{ score, level, timestamp: new Date().toISOString() }, ...userScores].slice(0, 3);
    allScores[userName] = updatedScores;
    localStorage.setItem("scores", JSON.stringify(allScores));

    navigate(`/score?name=${userName}&score=${score}&level=${level}`);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${LevelImage})` }}>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-30 rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Score: {score}</h2>
          <h3 className="text-xl font-semibold text-red-500 mb-4">Time Left: {timeLeft}s</h3>
          <h3 className="text-lg font-semibold text-yellow-600 mb-4">Level: {level}</h3>

          {isGameOver ? (
            <div>
              <h2 className="text-3xl font-bold text-red-600">Game Over!</h2>
              <button
                onClick={saveScoreAndNavigate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg mt-4"
              >
                View Score
              </button>
            </div>
          ) : currentEquation ? (
            <div>
              <img src={currentEquation.imageUrl} alt="Equation" className="mx-auto mb-4 w-74 h-74 object-contain rounded-lg shadow-lg" />
              <div className="flex items-center justify-center gap-4 mb-4">
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-48 p-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your answer"
                />
                <button onClick={() => setPaused(!paused)}>
                  <img src={pause} alt="Pause" className="w-10 h-10 opacity-90 hover:opacity-100 transition" />
                </button>
                <button
                  onClick={handleAnswerSubmit}
                  className="text-black py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: '#b5a669' }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl text-gray-500">Loading question...</p>
          )}
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/game-menu")}
            className="text-white py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
            style={{ backgroundColor: '#b5a669' }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
