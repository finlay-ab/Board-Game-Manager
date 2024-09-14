// common-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoYD_z4F0uGi9VLq8ES4Nl_yB06LckNS8",
  authDomain: "board-game-manager-14695.firebaseapp.com",
  projectId: "board-game-manager-14695",
  storageBucket: "board-game-manager-14695.appspot.com",
  messagingSenderId: "1044140598020",
  appId: "1:1044140598020:web:1480e227e87f088969a651",
  measurementId: "G-EWJLJYC2FC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
