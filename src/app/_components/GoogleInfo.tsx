import { Avatar } from '@chakra-ui/react';
import { set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../_lib/context/auth';

function GoogleInfo() {

  const user = useAuth();
  const [useremail, setUseremail] = useState<string>("");
  const [userimg,setUserimg] = useState<string>("");

  // ここから
  useEffect(() => {
    if(user != undefined && user != "loading"){
      setUseremail(user.email! || "");
      setUserimg(user.photoURL! || "");
    }
  }, [user]);
  // ここまで
  return (
    <>
      <p>
        {useremail}
      </p>
      <Avatar name='' src={userimg} />
    </>
  )
}

export default GoogleInfo