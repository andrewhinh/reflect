import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAeR8ZWAGAC9FlPkw1Vm1SYH1ZGy4HcAiA",
    authDomain: "calhacks-10.firebaseapp.com",
    projectId: "calhacks-10",
    storageBucket: "calhacks-10.appspot.com",
    messagingSenderId: "80399198785",
    appId: "1:80399198785:web:9651536491f80975c8f4c0",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
