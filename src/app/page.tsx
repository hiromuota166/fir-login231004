"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./_lib/context/auth";
import { login, logout } from "./_lib/auth";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useAuth();
  const [waiting, setWaiting] = useState<boolean>(false);
  
  // const [useremail, setUseremail] = useState<string>("");
  // const [userimg,setUserimg] = useState<string>("");

  const router = useRouter()
  
  //userが変更されたら実行
  useEffect(() => {
    console.log(user);
    // userが代入されている、かつ、userが"loading"出ない場合
    if (user != undefined && user != "loading") {
      // !はuser.emailがnullでないことを保証する
      // setUseremail(user.email!);
      // setUserimg(user.photoURL!);
      router.push('/home')
    }else{
      // setUseremail("");
      // setUserimg("");
      router.push('/')
    }
  }, [user]);
  
  const signIn = () => {
    setWaiting(true);
    
    login()
    .then(() => {
      console.log("ログインに成功しました。");
    })
      .catch((error) => {
        console.error(error?.code);
        console.log("ログインに失敗しました。");
      })
      .finally(() => {
        setWaiting(false);
      });
  };
  return (
    <div 
    className="flex justify-center w-screen h-screen items-center">
      <Button
        // isLoadingはボタンのローディング状態を表す(chakraUIの機能)
        isLoading={user === "loading"}
        onClick={user === null ? login : logout}
      >
        {/* 表示する内容 */}
        {user === null ? "Googleアカウントでログイン" : "ログアウト"}
      </Button>
      {/* <p>
        {useremail}
      </p>
      <Avatar name='' src={userimg} /> */}
    </div>
  );
}
