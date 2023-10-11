import { initializeApp, getApps, FirebaseApp } from "firebase/app";
// Firestoreはログインやユーザー登録の実装には使わないが、今後のことを考えて入れておく
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
//型を指定しておく
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
//undefinedの時に初期化がを行われないようにする
if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth();
  firestore = getFirestore();
  console.log("initialized firebase app");
}

export const db = getFirestore();
export { firebaseApp, auth };
