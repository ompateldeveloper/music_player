import { FastForward, Forward, NotepadText, Pause, Play, Rewind, SkipBack, SkipForward } from 'lucide-react'
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
            let progressPercentage = (currentTime / audioDuration) *100;
            setProgress(progressPercentage);
            if (audioDuration == currentTime){
                setProgress(0)

            }
        })
        // audio.addEventListener('')
    },[])

    return (
        <div className='p-4 pl-0' >
            <div className="inner bg-zinc-200 dark:bg-zinc-800 rounded-md p-2">
                <div className="progress">
                    <input id="small-range" type="range" value={progress}  onChange={()=>{}}  className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm  dark:bg-gray-700" />
                </div>
                <div className="flex items-center mx-1 w-full">
                    <div className="meta flex items-center my-1">
                        <div className="h-20 aspect-[16/9] overflow-hidden rounded-md bg-zinc-700">
                            {currentSong&&<img className='w-full h-full object-cover' src={'https://musicplayer-production-4f79.up.railway.app/api/assets/'+currentSong?.cover} alt="" />}
                        </div>
                        <div className='m-2'>
                            <div className="title truncate w-64" title={currentSong?.title}>{currentSong?.title}</div>
                            <div className="artist dark:text-zinc-400 text-xs ">{currentSong?.artist}</div>
                            <div className="album dark:text-zinc-400 text-xs">{currentSong?.album}</div>
                        </div>
                    </div>
                    <div className="controls flex items-center justify-center gap-3">
                        <button className={cn('prev disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong}><SkipBack/></button>
                        <button className={cn('play-pause bg-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 dark:bg-zinc-700 disabled:dark:hover:bg-zinc-800 disabled:dark:text-zinc-400 disabled:text-zinc-700 disabled:dark:bg-zinc-600 disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong} onClick={()=>{
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
                        <button className={cn('next disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong}><SkipForward/></button>
                    </div>
                    <div className="flex items-center">
                            
                    </div>
                </div>
            </div>
        </div>
    )
}
