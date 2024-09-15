const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase only if it hasn't been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Function to add an admin with an auto-generated document ID
const addAdmin = async (uid) => {
  try {
    // Add a new document with a generated ID
    const docRef = await db.collection('Admins').add({ uid });
    console.log(`Admin added successfully with document ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error adding admin:', error.message);
  }
};

// Example: Add an admin user
const uid = 'your-uid'; // Replace with the actual UID
addAdmin(uid);
