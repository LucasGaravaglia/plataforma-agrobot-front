import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKz1ESGtrkitOkW-KiF1TQ1ugXZm6jrDw",
  authDomain: "plataforma-missoes.firebaseapp.com",
  databaseURL: "https://plataforma-missoes-default-rtdb.firebaseio.com",
  projectId: "plataforma-missoes",
  storageBucket: "plataforma-missoes.appspot.com",
  messagingSenderId: "629408237313",
  appId: "1:629408237313:web:ee6d13e60a223cba3c3d00",
};

export const app = initializeApp(firebaseConfig);
