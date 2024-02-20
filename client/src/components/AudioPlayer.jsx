import { ChevronUpIcon, FastForward, Forward, NotepadText, Pause, Play, Rewind, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { cn, formatTime } from "../lib/utils"
import {useMusicContext} from '../contexts/MusicContextProvider'
export default function AudioPlayer() {
    const {songs,audio,currentSong,setCurrentSong,isPlaying,setIsPlaying } = useMusicContext();
    const [progress,setProgress] = useState(0)
    const [volume,setVolume] = useState(1)
    const [full,setFull] = useState(false);
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
    useEffect(()=>{},[currentSong])
    const playNextSong = () => {
        console.log(currentSong);
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song._id === currentSong._id);
            const nextIndex = (currentIndex + 1) % songs.length;
            const nextSong = songs[nextIndex];
            setCurrentSong(nextSong);
            console.log(nextSong.title,currentSong);
            audio.src = 'https://musicplayer-production-4f79.up.railway.app/api/assets/'+nextSong.src
            playSong();
        }
    };

    const playPreviousSong = () => {
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song._id === currentSong._id);
            const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
            const previousSong = songs[previousIndex];

            setCurrentSong(previousSong);
            audio.src = 'https://musicplayer-production-4f79.up.railway.app/api/assets/'+previousSong.src
            playSong();
        }
    }

    const handleProgress = (e)=>{
        if(currentSong){
            let rangeValue = parseFloat(e.target.value);
            audio.currentTime = rangeValue;
            setProgress(rangeValue) 
        }
    }
    useEffect(()=>{
        const timeupdate = audio.addEventListener('timeupdate',async (e)=>{
            setProgress(audio.currentTime);
            console.log(audio.ended);
            // if (audio.ended) playNextSong();
        })

    },[])

    useEffect(()=>{
        const ended = audio.addEventListener('ended',async (e)=>{
            playNextSong();
            console.log('ended');
        })

    },[currentSong])

    return (
        <div className='p-4 pl-0 overflow-hidden  ' >
            <div className={cn("inner bg-zinc-200 dark:bg-zinc-800 rounded-b-lg border-t border-zinc-300 dark:border-zinc-700 border-opacity-10  p-2 absolute bottom-4 w-[calc(100%-16px)] h-36 duration-200",full&&"rounded-t-lg h-[calc(100%-32px)] border-none")}>
                <div className="progress flex items-center ">
                    {currentSong?<div className="text-xs m-2 ">{formatTime(audio.currentTime)}</div>:<div className="text-xs m-2 text-zinc-400 text-nowrap">--:--</div>}
                    <div className="w-full flex items-center relative ">
                        <input id="small-range" type="range" min={0} max={audio.duration} step={0.1} value={progress} onChange={handleProgress}  className="w-full opacity-0 z-10 bg-gray-300 rounded-lg appearance-none cursor-pointer range-sm  dark:bg-gray-700 " />
                        <div className="absolute w-full rounded-full overflow-hidden bg-zinc-300 dark:bg-zinc-700 h-1.5">
                            <div className={`h-full bg-white bg-opacity-70 rounded-sm `} style={{width:`${(progress/audio.duration)*100}%`}}></div>
                        </div>
                    </div>
                    {currentSong?<div className="text-xs m-2 ">{formatTime(audio.duration)}</div>:<div className="text-xs m-2 text-zinc-400 text-nowrap">--:--</div>}
                </div>
                <div className="flex items-center mx-1 w-full">
                    <div className="meta flex items-center my-1">
                        <div className="h-20 aspect-[16/9] overflow-hidden rounded-md bg-zinc-300 dark:bg-zinc-700">
                            {currentSong&&<img className='w-full h-full object-cover' src={'https://musicplayer-production-4f79.up.railway.app/api/assets/'+currentSong?.cover} alt="" />}
                        </div>
                        <div className='m-2 '>
                            <div className={cn("title truncate w-64",!currentSong&&"bg-zinc-300 dark:bg-zinc-700 h-6 rounded")} title={currentSong?.title}>{currentSong?.title}</div>
                            <div className={cn("artist truncate w-32 rounded-sm dark:text-zinc-400 text-xs ",!currentSong&&"bg-zinc-300 dark:bg-zinc-700 h-3 my-1")}>{currentSong?.artist}</div>
                            <div className={cn("album truncate w-32 rounded-sm dark:text-zinc-400 text-xs",!currentSong&&"bg-zinc-300 dark:bg-zinc-700 h-3 my-1")}>{currentSong?.album}</div>
                        </div>
                    </div>
                    <div className="controls flex items-center justify-center gap-3">
                        <button className={cn('prev disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center disabled:text-zinc-400 disabled:dark:text-zinc-700  hover:text-fuchsia-300',)} 
                        disabled={!currentSong}
                        onClick={()=>{playPreviousSong()}}
                        ><SkipBack/></button>
                        <button className={cn('play-pause bg-zinc-300 hover:bg-opacity-40 dark:hover:bg-zinc-600 dark:text-zinc-300 text-zinc-800 dark:bg-zinc-700 disabled:dark:hover:bg-zinc-800 disabled:dark:text-zinc-400 disabled:text-zinc-700 disabled:dark:bg-zinc-600 disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center',)} disabled={!currentSong} onClick={()=>{
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
                        <button className={cn('next disabled:pointer-events-none rounded-full h-10 w-10 text-center flex items-center justify-center disabled:text-zinc-400 disabled:dark:text-zinc-700 hover:text-fuchsia-300',)} 
                        disabled={!currentSong}
                        onClick={()=>{playNextSong()}}
                        ><SkipForward/></button>
                    </div>
                    <div className="flex items-center ml-auto m-4 ">
                            <div className={cn("volume flex items-center gap-2 group overflow-hidden",!currentSong&&"")}>
                                <label htmlFor="audio-vol">
                                    {
                                        volume<=0?
                                        <VolumeX/>
                                        :
                                            volume<0.2
                                            ?
                                            <Volume/>
                                            :
                                            volume<0.8
                                                ?
                                                <Volume1/>
                                                :
                                                <Volume2/>
                                    }
                                </label>
                                <input type="range" id='audio-vol' min={0} max={1} step={0.01} value={volume} onChange={(e)=>{
                                    setVolume(e.target.value)
                                    audio.volume=e.target.value
                                }} className=' bg-gray-300 rounded-lg appearance-none cursor-pointer range-sm  dark:bg-gray-700 w-0 opacity-0 group-hover:opacity-100 group-hover:w-20 duration-150 '/>
                            </div>
                            <div className="">
                                <ChevronUpIcon className={cn(full&&"rotate-180")} onClick={()=>{setFull(!full)}}/>
                            </div>
                    </div>
                </div>
                {/* <div className="" onClick={()=>{console.log(currentSong);}}>ao</div> */}
                {full&&<div className="lyrics flex items-center justify-center min-h-96">
                    <span>No lyrics </span>
                </div>}
            </div>
        </div>
    )
}
