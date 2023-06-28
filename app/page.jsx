"use client"
import React, { useContext } from 'react'
import { UserContext } from '@context/UserContext';
import { useRouter } from "next/navigation";

const Home = () => {
    const context = useContext(UserContext);
    const router = useRouter();

  if(!context.user) {
    return router.push('/signin')
  }
  return(
    <>page</>
  )
}

export default Home;