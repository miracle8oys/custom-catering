import app from "../config/firebaseConfig";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  onSnapshot,
  where,
  updateDoc,
  increment,
  setDoc,
  Timestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(app);

export {
  db,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  onSnapshot,
  where,
  updateDoc,
  increment,
  setDoc,
  orderBy,
  Timestamp,
  deleteDoc,
};
