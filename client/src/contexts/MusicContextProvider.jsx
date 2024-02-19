import React, { createContext, useContext, useEffect, useState } from 'react'
const MusicContext = createContext()

const audio = new Audio();

export function MusicContextProvider({ children }) {
    const [songs,setSongs] = useState();
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tab, setTab] = useState(0);


    useEffect(()=>{
        return()=>{
            audio.src=''; 
            setCurrentSong(null)
        }
    },[])



    const value = {
        songs,
        audio,
        currentSong,
        isPlaying,
        tab,
        setTab,
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