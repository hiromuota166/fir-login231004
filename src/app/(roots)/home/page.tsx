//ログウトボタンを押すとログイン画面に戻る
//同時にログアウトの状態に戻すボタンを作る
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import { useAuth } from "@/app/_lib/context/auth";
import { logout } from "@/app/_lib/auth";
import GoogleInfo from "@/app/_components/GoogleInfo";

function HomePage() {
  const user = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <Button onClick={handleLogout}>ログアウト</Button>
      <div>この画面はホーム画面です！</div>
      <GoogleInfo />
    </>
  );
}

export default HomePage;
