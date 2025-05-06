import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9PHKrCw7dB0StYZEN6FmbStsAL2_UbmU",
  authDomain: "stockdashboard-6e8c6.firebaseapp.com",
  projectId: "stockdashboard-6e8c6",
  storageBucket: "stockdashboard-6e8c6.firebasestorage.app",
  messagingSenderId: "795763776801",
  appId: "1:795763776801:web:44b3d93dc101881bdd7260"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
