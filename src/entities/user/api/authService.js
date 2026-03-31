import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../../shared/api/firebase/firebaseConfig";

export const registerUser = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);
export const loginUser = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
export const logoutUser = async () => await signOut(auth);
export const loginWithGoogle = async () => await signInWithPopup(auth, new GoogleAuthProvider());
export const subscribeToAuthChanges = (callback) => onAuthStateChanged(auth, callback);