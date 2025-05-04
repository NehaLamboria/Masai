import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBaAqbYw29Py1b2y05V5-4YAH37RTbDDAs",
  authDomain: "react-movie-41dea.firebaseapp.com",
  databaseURL: "https://react-movie-41dea-default-rtdb.firebaseio.com",
  projectId: "react-movie-41dea",
  storageBucket: "react-movie-41dea.appspot.com", 
  messagingSenderId: "826669060467",
  appId: "1:826669060467:web:97af59086918ec221f7506"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
