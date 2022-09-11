import { useContext, createContext } from "react";
import { UserInfo } from "firebase/auth";

const defaultUserCredential = {
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: "",
  uid: "",
};

const UserContext = createContext<UserInfo>(defaultUserCredential);

const useUserContext = () => useContext(UserContext);

export { defaultUserCredential, UserContext, useUserContext };
