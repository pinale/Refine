# refinefirebase

```bash
npm i refine-firebase
```

create an .env file past firebase configuration 
```
REACT_APP_FIREBASE_API_KEY = "YOUR-UNIQUE-CREDENTIALS"
REACT_APP_FIREBASE_AUTH_DOMAIN = "YOUR-PROJECT-NAME.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL = "https://YOUR-PROJECT-NAME.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID = "YOUR-PROJECT-FIREBASE-PROJECT-ID"
REACT_APP_FIREBASE_STORAGE_BUCKET = "YOUR-PROJECT-NAME.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "YOUR-PROJECT-SENDER-ID"
REACT_APP_FIREBASE_APP_ID = "YOUR-PROJECT-APP-ID"
```


Create a .js Configuration file with Firebase Reference
```TS
import { 
    initializeFirebase,
    FirebaseAuth,
    FirebaseDatabase,
    FirestoreDatabase,    
} from "refine-firebase";

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
```



# Firebase vs Firestore, which one to choose?

| FIREBASE | FIRESTORE |
| --- | --- |
| Stores data as one large JSON tree | Simple data are stored in documents, similar to JSON |
| Complex, hiererchical data is harder to organize at scale | Comple, hierarchical data is easier to organize at scale, using subcollection within documents |
|     | Requires less denormalization and data flattening | 
| Realtime and Offline support | Realtime and Offline support |
[more info about Firebase vs Firestore - https://firebase.google.com/docs/firestore/rtdb-vs-firestore](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)




some materials to use:


https://github.com/abhisheknaiidu/awesome-github-profile-readme