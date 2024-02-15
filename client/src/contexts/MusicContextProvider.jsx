import React, { createContext, useContext, useEffect, useState } from 'react'
const MusicContext = createContext()

const audio =new Audio();

export function MusicContextProvider({ children }) {
    const [songs,setSongs] = useState()
    
    useEffect(()=>{
    },[])
    return (
        <MusicContext.Provider value={{songs,setSongs}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusicContext = () => {
    const context = useContext(MusicContext)
  
    if(!context) {
      throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
  
    return context
}