// lib/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://davidbukolafoundation-db.firebaseio.com",
  });
}

export default admin;
