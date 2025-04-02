import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ScoreBackgroundImage from "../assets/menu1.jpg";
import { auth, getUserScores, updateUserScores } from "../components/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const ScorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [userName, setUserName] = useState("username");
  const [previousScores, setPreviousScores] = useState([]);
  const [userId, setUserId] = useState(null);

  const currentScore = parseInt(queryParams.get("score"), 10) || 0;
  const level = queryParams.get("level") || "easy";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const userData = await getUserScores(user.uid);
          if (userData) {
            setUserName(userData.userName);
            setPreviousScores(userData.scores || []);
          }
        } catch (error) {
          console.error("Error fetching user scores:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId && currentScore > 0) {
      const updateScores = async () => {
        try {
          await updateUserScores(userId, currentScore, level);
          const updatedUserData = await getUserScores(userId);
          if (updatedUserData) {
            setPreviousScores(updatedUserData.scores);
          }
        } catch (error) {
          console.error("Error updating user scores:", error);
        }
      };
      updateScores();
    }
  }, [userId, currentScore, level]);

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${ScoreBackgroundImage})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="min-h-screen flex justify-center items-start pt-20 px-10">
        <div className="p-10 rounded-lg shadow-2xl w-full sm:w-96 bg-opacity-0 backdrop-blur-md" style={{ width: '600px', height: '600px' }}>
          <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center mb-4 drop-shadow-lg">
            Hi, {userName}! 
          </h1>
          
          <h2 className="text-4xl font-bold text-center text-black-300 mb-8 drop-shadow-lg">
            Your Scores
          </h2>
          
          <table className="w-full text-black-400 border-collapse border-2 border-black text-center">
          <thead>
            <tr style={{ backgroundColor: "#b5a669" }}>
              <th className="border-2 border-black px-4 py-2">Score</th>
              <th className="border-2 border-black px-4 py-2">Level</th>
            </tr>
          </thead>
          <tbody>
             {previousScores.map((entry, index) => (
             <tr key={index} className="bg-gray-100">
             <td className="border-2 border-black px-4 py-2">{entry.score}</td>
             <td className="border-2 border-black px-4 py-2">{entry.level}</td>
             </tr>
    ))}
  </tbody>
</table>

          
          <div className="mt-6 flex flex-col space-y-4 items-center w-full">
            <button
              onClick={() => navigate("/level")}
              className="w-60 text-black py-3 rounded-lg text-xl font-semibold hover:scale-105 shadow-lg transition duration-300"
              style={{ backgroundColor: '#b5a669' }}
            >
              Play Again
            </button>
            <button
              onClick={() => navigate("/game-menu")}
              className="w-60 text-black py-3 rounded-lg text-xl font-semibold hover:scale-105 shadow-lg transition duration-300"
              style={{ backgroundColor: '#b5a669' }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
