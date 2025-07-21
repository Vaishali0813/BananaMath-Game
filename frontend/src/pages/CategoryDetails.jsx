import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bgImage from '../assets/wel.jpeg';
import axios from 'axios';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [criteria, setCriteria] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/welfare/category/${categoryName}`);
        setCriteria(res.data);
      } catch {
        setError('Failed to load data.');
      }
    };
    fetchData();
  }, [categoryName]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="relative z-10">
        <Navbar />

        <div className="pt-5 px-4 max-w-3xl mx-auto min-h-screen flex items-center justify-center">
          <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full text-center">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">{categoryName}</h2>

            {error && <p className="text-red-500">{error}</p>}

            {criteria ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Eligibility Criteria:</h3>
                <ul className="list-disc list-inside text-left text-gray-700 mb-6">
                  {criteria.eligibilityCriteria?.ageGreaterThan && (
                    <li>Age should be greater than {criteria.eligibilityCriteria.ageGreaterThan}</li>
                  )}
                  {criteria.eligibilityCriteria?.incomeLessThan && (
                    <li>Monthly income must be less than {criteria.eligibilityCriteria.incomeLessThan}</li>
                  )}
                  {criteria.eligibilityCriteria?.gender && (
                    <li>Gender must be {criteria.eligibilityCriteria.gender}</li>
                  )}
                  {criteria.eligibilityCriteria?.employmentStatus && (
                    <li>Employment Status: {criteria.eligibilityCriteria.employmentStatus}</li>
                  )}

                  {categoryName === 'Medical Welfare' && criteria.eligibilityCriteria?.requiresMedical && (
                    <>
                      <li>Applicant must have a diagnosed medical condition</li>
                      {criteria.eligibilityCriteria?.specialCase && (
                        <>
                          <li>Must be diagnosed with: cancer</li>
                          <li>Must be diagnosed with: kidney failure</li>
                        </>
                      )}
                    </>
                  )}

                  {categoryName === 'Disability Welfare' && (
                    <>
                      <li>Applicant must have one of the following disabilities:</li>
                      <ul className="list-disc list-inside ml-6 text-gray-700">
                        <li>Dumb</li>
                        <li>Amputee</li>
                        <li>Stroke</li>
                        <li>Autism</li>
                        <li>Mentally Unstable</li>
                        <li>Deaf</li>
                        <li>Blind</li>
                      </ul>
                    </>
                  )}
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Required Documents:</h3>
                <ul className="list-disc list-inside text-left text-gray-700 mb-6">
                  {criteria.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>

                {/* Buttons at Bottom */}
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition duration-300"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => navigate('/eligibilty-check')}
                    className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition duration-300"
                  >
                    Check
                  </button>
                </div>
              </>
            ) : (
              !error && <p className="text-gray-600">Loading details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
