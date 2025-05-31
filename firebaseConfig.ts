// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration.
// CRITICAL: Ensure this configuration points to your VALID Firebase project
// and that Firestore has been enabled for this project in the Firebase console.
// An incorrect projectId or Firestore not being set up for the project
// is a common cause for "Service firestore is not available".
const firebaseConfig = {
  apiKey: "AIzaSyAB9462ndefnzzJg44HPa40P3m9vwPUFw0",
  authDomain: "myresume-457817.firebaseapp.com",
  projectId: "myresume-457817",
  storageBucket: "myresume-457817.firebasestorage.app",
  messagingSenderId: "711582759542",
  appId: "1:711582759542:web:a2921fbd9a2967fae57d57",
  measurementId: "G-BSN3FGV679"
};

let app: FirebaseApp;
let db: Firestore;

try {
  // Simplify initialization: In most client-side apps, direct initialization is sufficient.
  // The getApps().length check is more common in environments with potential re-initialization.
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp(); // Get existing app if already initialized
  }
  
  db = getFirestore(app, "investorhub");
  console.log("Firebase app and Firestore service initialized successfully.");

} catch (e) {
  console.error(
    "CRITICAL FIREBASE INITIALIZATION ERROR: Failed to initialize Firebase app or Firestore service.",
    e
  );
  console.error(
    "IMPORTANT: Please ensure that the `firebaseConfig` object in `firebaseConfig.ts` contains the correct details " +
    "for your Firebase project and that you have ENABLED Firestore for this project in the Firebase console " +
    "(Project Settings -> Build -> Firestore Database -> Create database)."
  );
  // Re-throw the error to halt further execution if Firebase is essential.
  // This will make the issue apparent in the browser console.
  throw e;
}

export { db };
