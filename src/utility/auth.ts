import app from "../config/firebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const googleAuth = () => {
  const authResult = signInWithPopup(auth, googleProvider)
    .then((res) => res)
    .catch((err) => err.message);

  return authResult;
};

const emailAuthRegister = (email: string, password: string) => {
  const authResult = createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser).then((res) => res);
      }
      return res;
    })
    .catch((err) => err.message);

  return authResult;
};

const emailAuthLogin = (email: string, password: string) => {
  const authResult = signInWithEmailAndPassword(auth, email, password)
    .then((res) => res)
    .catch((err) => err.message);
  return authResult;
};

const userLogout = async () => {
  signOut(auth)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export {
  auth,
  googleAuth,
  emailAuthLogin,
  emailAuthRegister,
  onAuthStateChanged,
  userLogout,
  updateProfile,
};
