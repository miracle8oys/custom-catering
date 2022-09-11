import app from "../config/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
