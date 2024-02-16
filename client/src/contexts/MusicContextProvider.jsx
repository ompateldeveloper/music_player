import React, { createContext, useContext, useEffect, useState } from 'react'
const MusicContext = createContext()

const audio = new Audio();

export function MusicContextProvider({ children }) {
    const [songs,setSongs] = useState();
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = () => {
        if (currentSong) {
            // audio.src = currentSong; // Assuming currentSong is the URL of the song
            audio.play();
            setIsPlaying(true);
        }
    };

    const pauseSong = () => {
        audio.pause();
        setIsPlaying(false);
    };

    const setSong = (song) => {
        setCurrentSong(song);
        audio.src = song;
        audio.play();
        setIsPlaying(true);
    };

    const value = {
        songs,
        audio,
        currentSong,
        isPlaying,
        setSongs,
        playSong,
        pauseSong,
        setSong
        
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