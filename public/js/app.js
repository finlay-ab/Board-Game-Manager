// Import the required functions from the Firebase SDK
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Initialize Firebase Authentication and Firestore
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(); // Firestore instance

const authBtn = document.getElementById('authBtn');

// Function to check if the user is an admin
const checkAdminStatus = async (uid) => {
    try {
        const docRef = doc(db, 'Admins', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('The user is an admin.');
            return true;
        } else {
            console.log('The user is not an admin.');
            return false;
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};

// Function to update the authentication button
const updateAuthBtn = (user) => {
    if (user) {
        // Check if the user is an admin
        checkAdminStatus(user.uid);
        
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
