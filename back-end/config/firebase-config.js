const admin = require('firebase-admin');
const path = require('path');

// Load service account from JSON file
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Admin initialized successfully');

module.exports = admin;