import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import EligibilityCheck from './pages/Eligibility/EligibilityCheck';
import EligibilityResult from './pages/Eligibility/EligibilityResult';
import Instructions from './pages/Instructions';
import Categories from './pages/Categories';
import CheckDocument from './pages/CheckDocument';
import CategoryDetails from './pages/CategoryDetails';



const App = () => (
  <Router>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/eligibilty-check" element={<EligibilityCheck />} />
      <Route path="/int" element={<Instructions />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/check-document" element={<CheckDocument />} />
      <Route path="/eligibility-result" element={<EligibilityResult/>} />
      <Route path="/categories/:categoryName" element={<CategoryDetails />} />
      </Routes>
  </Router>
);

export default App;
