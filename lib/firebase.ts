import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  type Auth,
} from "firebase/auth"

// ─────────────────────────────────────────────────────────────────────────────
// FIREBASE ENVIRONMENT CONFIGURATION
// Reads client-side environment variables defined in .env.local
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Development environment variable validation
if (process.env.NODE_ENV === "development") {
  const requiredKeys: (keyof typeof firebaseConfig)[] = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ]
  const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key])

  if (missingKeys.length > 0) {
    console.warn(
      `[Firebase Initialization] Missing environment variables: ${missingKeys
        .map((key) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`)
        .join(", ")}. Please verify your .env.local file.`
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLETON INITIALIZATION
// Prevents duplicate app initialization across Next.js App Router SSR & Fast Refresh
// ─────────────────────────────────────────────────────────────────────────────
import { getFirestore, type Firestore } from "firebase/firestore";
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = getFirestore(app);


// Google Authentication Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})

export { app, auth, googleProvider, setPersistence, browserLocalPersistence, browserSessionPersistence, db };
