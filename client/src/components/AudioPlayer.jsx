import { FastForward, Forward, NotepadText, Pause, Play, Rewind } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { cn } from "../lib/utils"
import {useMusicContext} from '../contexts/MusicContextProvider'
export default function AudioPlayer() {
    const {audio,currentSong,isPlaying,setIsPlaying } = useMusicContext();
    const [progress,setProgress] = useState(0)
    const playSong = () => {
        if (currentSong) {
            audio.play();
            setIsPlaying(true);
        }
    };


    const pauseSong = () => {
        audio.pause();
        setIsPlaying(false);
    };

    useEffect(()=>{
        audio.addEventListener('timeupdate',(e)=>{
            const audioDuration = audio.duration;
            const currentTime = audio.currentTime;
            let progressPercentage = (currentTime / audioDuration);
            setProgress(progressPercentage);
        })
    },[])

    return (
        <div className='p-4 pl-0' >
            <div className="inner bg-zinc-300 dark:bg-zinc-800 rounded-md p-2">
                <div className="progress">
                    <input id="small-range" type="range" value={progress}  onChange={()=>{}}  className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm  dark:bg-gray-700" />
                </div>
                <div className="flex">
                    <div className="controls flex items-center justify-center gap-3">
                        <button className={cn('prev bg-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 dark:bg-zinc-700 disabled:dark:hover:bg-zinc-800 disabled:dark:text-zinc-400 disabled:text-zinc-700 disabled:dark:bg-zinc-600 disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong}><Rewind/></button>
                        <button className={cn('prev bg-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 dark:bg-zinc-700 disabled:dark:hover:bg-zinc-800 disabled:dark:text-zinc-400 disabled:text-zinc-700 disabled:dark:bg-zinc-600 disabled:pointer-events-none rounded-full h-12 w-12 text-center flex items-center justify-center',)} disabled={!currentSong} onClick={()=>{
                            isPlaying
                            ?
                            pauseSong()
                            :
                            playSong()
                        }}>
                            {
                                isPlaying
                                ?
                                <Pause/>
                                :
                                <Play/>
                            }
                        </button>
                        <button className={cn('prev bg-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 dark:bg-zinc-700 disabled:dark:hover:bg-zinc-800 disabled:dark:text-zinc-400 disabled:text-zinc-700 disabled:dark:bg-zinc-600 disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong}><FastForward/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
