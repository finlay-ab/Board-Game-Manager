var admin = require("firebase-admin");

var serviceAccount = require("//Path//");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Function to list all users and check for admin role
async function listAdmins() {
  try {
    const listUsersResult = await admin.auth().listUsers(); // List all users
    const admins = [];

    listUsersResult.users.forEach((userRecord) => {
      const customClaims = userRecord.customClaims || {};
      if (customClaims.role === 'admin') {
        admins.push({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
        });
      }
    });

    if (admins.length > 0) {
      console.log('Admin Users:');
      admins.forEach(adminUser => {
        console.log(`- UID: ${adminUser.uid}, Email: ${adminUser.email}, Display Name: ${adminUser.displayName}`);
      });
    } else {
      console.log('No admin users found.');
    }
  } catch (error) {
    console.error('Error listing users:', error);
  }
}

// Run the function to list admins
listAdmins();
