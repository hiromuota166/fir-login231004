"use client";
import { User, onAuthStateChanged } from "firebase/auth";
// import { User } from "../types/user";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ログイン中/ログインしていない/ローディング中
type UserContextType = User | null | 'loading';

//undefinedを初期値に持ったAuthContextを作成
//型はUserContextType
const AuthContext = createContext<UserContextType>('loading');

//AuthProviderを作成

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // const ref = doc( db, `users/${firebaseUser.uid}`);
        // const snap = await getDoc(ref);
        // if (snap.exists()) {
        //   const appUser = (await getDoc(ref)).data() as User;
        //   setUser(appUser);
        // } else {
        //   const appUser: User = {
        //     id: firebaseUser.uid,
        //     name: firebaseUser.displayName!,
        //   };
        //   setDoc(ref, appUser).then(() => {
        //     setUser(appUser);
        //   });
        // }
      } else {
        setUser(null);
      }

      return unsubscribe;
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
