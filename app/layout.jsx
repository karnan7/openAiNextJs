"use client"
import '@styles/globals.css';
import { UserContext } from '@context/UserContext';
import { useState } from 'react';

export const metadata = {
    title: "MikkiOpenAi",
    description: "",
}

const RootLayout = ({ children }) => {
    const [user, setUser] = useState(null);
  return (
    <html lang='en'>
       <body>
         <div className="main">

         </div>
         <main className="app">
          <UserContext.Provider value={{user,setUser}}>
            {children}
          </UserContext.Provider>
         </main>
       </body>
    </html>
  )
}

export default RootLayout;