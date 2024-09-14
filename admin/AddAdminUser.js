var admin = require("firebase-admin");

var serviceAccount = require("//Path//");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to assign admin role to a user
async function setAdminRole(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(`Admin role granted to user with UID: ${uid}`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

// Replace 'USER_UID_HERE' with the actual user ID you want to make admin
setAdminRole('Users UID');
