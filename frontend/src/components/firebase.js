// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGoTedAQInChBpsOaOlDb8IBfi2ie9Rfs",
  authDomain: "banana-7b5c7.firebaseapp.com",
  projectId: "banana-7b5c7",
  storageBucket: "banana-7b5c7.appspot.com",
  messagingSenderId: "7541018066",
  appId: "1:7541018066:web:43c1cca42f1732c9530c0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication and Firestore
export const auth = getAuth();
export const db = getFirestore(app);

// Function to get user scores from Firestore
export const getUserScores = async (userId) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        userName: userData.userName || "Player",
        scores: userData.scores || [], // Return all scores
      };
    } else {
      console.log("User data not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return null;
  }
};

// Function to update user scores in Firestore
export const updateUserScores = async (userId, currentScore, level) => {
  try {
    const userDocRef = doc(db, "Users", userId);

    // Use arrayUnion to append the new score to the scores array
    await updateDoc(userDocRef, {
      scores: arrayUnion({ score: currentScore, level: level }), // Append new score
    });

    console.log("Score updated successfully!");
  } catch (error) {
    console.error("Error updating user scores:", error);
  }
};

// Function to create a new user document if not already existing
export const createNewUser = async (userId, userName) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    await setDoc(userDocRef, {
      userName,
      scores: [], // Initialize with an empty scores array
    });
    console.log("New user created successfully!");
  } catch (error) {
    console.error("Error creating new user document:", error);
  }
};

export default app;