// EligibilityResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EligibilityResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.eligibilityResult;

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-20 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Eligibility Result</h2>

        {!result ? (
          <p className="text-center text-gray-600">No data available.</p>
        ) : result.eligible ? (
          <>
            <h3 className="text-xl font-semibold text-green-600 mb-4">✅ You are eligible for:</h3>
            {result.schemes.map((scheme, idx) => (
              <div key={idx} className="mb-6 border rounded-lg p-4 shadow bg-gray-50">
                <h4 className="font-bold text-lg text-orange-700 mb-2">{scheme.welfareType}</h4>
                <ul className="list-disc ml-6 text-gray-700">
                  {scheme.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <div className="text-red-600 text-lg font-medium text-center">{result.message}</div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/eligibilty-check")}
            className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EligibilityResult;
