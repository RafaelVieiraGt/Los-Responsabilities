import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyA0znrbYZBe9R_bpwmaYrrV2e5cWC4LNk8",
    authDomain: "aprendizado-933b6.firebaseapp.com",
    projectId: "aprendizado-933b6",
    storageBucket: "aprendizado-933b6.appspot.com",
    messagingSenderId: "118135193534",
    appId: "1:118135193534:web:1745cf33dea22885b843ef",
    measurementId: "G-924LVKES77"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

  export { db, auth };