import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import bgImage from "../assets/image.jpg";

const Instructions = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/login"); 
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image with reduced opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Content container with padding */}
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            We are here to help you find the right welfare support..
          </h1>

          <div className="space-y-6 text-lg text-gray-700 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
            <p>
              This website helps Sri Lankan citizens easily check their eligibility
              for government welfare programs by entering basic personal details.
              It quickly matches users with suitable benefits based on their
              individual situation.
            </p>
            <p>
              The website not only shows eligibility results but also provides clear
              instructions on required documents and how to apply through channels
              like the Grama Niladhari. It supports local languages, works on any
              device, and helps users access welfare benefits easily and
              confidently.
            </p>
            <p>
              It ensures privacy and data security by safely handling personal
              information, giving users peace of mind while using the service.
            </p>
            <p>
              The platform is regularly updated to reflect the latest welfare
              policies, ensuring users always get accurate and up-to-date guidance.
            </p>

            {/* Centered Button with orange color */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleStartGame}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
              >
                Check My Eligibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
