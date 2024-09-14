// User Authentication
// Import the required functions from the Firebase SDK
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const provider = new GoogleAuthProvider();

const authBtn = document.getElementById('authBtn');

const updateAuthBtn = (user) => {
    if (user) {
        authBtn.textContent = 'Log Out';
        authBtn.onclick = () => signOut(auth);
    } else {
        authBtn.textContent = 'Log In';
        authBtn.onclick = () => signInWithPopup(auth, provider);
    }
};

// Listen for auth state changes and update the button
onAuthStateChanged(auth, (user) => {
    updateAuthBtn(user);
});
