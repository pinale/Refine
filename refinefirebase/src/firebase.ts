// import { 
//     initializeFirebase,
//     FirebaseAuth,
//     FirebaseDatabase,
//     FirestoreDatabase,    
// } from 'refine-firebase/lib';

import { 
  initializeFirebase,
  FirebaseAuth,
  FirebaseDatabase,
  FirestoreDatabase,
} from './refine-firebase-dataprovider/src';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

export const firebaseApp = initializeFirebase(firebaseConfig);

export const firebaseAuth = new FirebaseAuth();
export const firestoreDatabase = new FirestoreDatabase();
export const firebaseDatabase = new FirebaseDatabase();