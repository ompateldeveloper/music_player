import React, { createContext, useContext, useEffect, useState } from 'react'
const MusicContext = createContext()

const audio = new Audio();

export function MusicContextProvider({ children }) {
    const [songs,setSongs] = useState();
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(()=>{
        audio.addEventListener('timeupdate',()=>{
            
        })
    },[])

    const value = {
        songs,
        audio,
        currentSong,
        isPlaying,
        setSongs,
        setCurrentSong,
        setIsPlaying
    }
    
    return (
        <MusicContext.Provider value={value}>
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