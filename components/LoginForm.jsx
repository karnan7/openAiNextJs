"use client"
import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '@config/firebaseConfig'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const context = useContext(UserContext);
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            context.setUser(user);
            router.push("/");
        })
        .catch((error) => {
            alert(error.message)
            console.log(error);
        })
    }

    const handleGoogleSignIn = async () => {
        const googleAuthProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleAuthProvider)
        .then((userCredential) => {
            context.setUser(userCredential.user);
            router.push("/");
        })
        .catch((error) => {
            alert(error.message)
            console.log(error);
        })
    }

  return (
    <section className='login-page'>
        <div className="box">
            <h1>Login</h1>
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
                type='submit'>Login</button>
            </form>
            <div onClick={handleGoogleSignIn} className="google">
               <FcGoogle style={{fontSize:"20px"}}/>
               <p>Sign In with Google</p>
            </div>
        </div>
    </section>
  )
}

export default LoginForm;