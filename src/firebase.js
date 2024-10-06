import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0fWhLZKsJ4G2gpo_Yxi4sXYBxRgK3Sk0",
    authDomain: "shuttle-119cd.firebaseapp.com",
    projectId: "shuttle-119cd",
    storageBucket: "shuttle-119cd.appspot.com",
    messagingSenderId: "145027193144",
    appId: "1:145027193144:web:421079b87163303ee949cd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
