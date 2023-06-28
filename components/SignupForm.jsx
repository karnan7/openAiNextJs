"use client"
import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '@config/firebaseConfig'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from "next/navigation";
import Link from 'next/link';

const SignupForm = () => {
    const router = useRouter();
    const context = useContext(UserContext);
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            context.setUser(userCredential.user);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleGoogleSignIn = async () => {
        const googleAuthProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleAuthProvider)
        .then((userCredential) => {
            context.setUser(userCredential.user);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(context.user?.uid){
        return router.push('/signin')
    }
  return (
    <section className='login-page'>
        <div className="box">
            <h1>SignUp</h1>
            <form onSubmit={handleLogin}>
                <input 
                type="email"
                placeholder='Email'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                
                <input 
                type="password"
                placeholder='Password'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button
                className='login-button' 
                type='submit'>SignUp</button>
            </form>
            <div onClick={handleGoogleSignIn} className="google">
               <FcGoogle style={{fontSize:"20px"}}/>
               <p>Sign Up with Google</p>
            </div>
            <div className='auth-links'>
                Already have an account?<Link href="/signin"> Sign In</Link>
            </div>
        </div>
    </section>
  )
}

export default SignupForm;