import { auth } from '@/app/_lib/firebase';
import {
  //google認証を使うための関数
  GoogleAuthProvider,
  //ログインしたユーザーの情報を取得するための関数
  signInWithPopup,
  //認証に成功したユーザーの情報を取得するための関数
  UserCredential,
  //ログアウトするための関数
  signOut,
} from 'firebase/auth';

export const login = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  //ユーザにアカウント選択画面を表示させる
  provider.setCustomParameters({ 
    prompt: 'select_account' 
  });
  return signInWithPopup(auth, provider);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};