import axios from 'axios';
import React, { useState } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider';
import {cn} from  "../lib/utils"
import { Play, PlayCircle, PlayIcon } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContextProvider';
export default function Song({ data, index }) {
    const [menu, setMenu] = useState(false);
    const {user} = useAuthContext()
    const {audio,songs,setSongs,currentSong,setCurrentSong,setIsPlaying} = useMusicContext();


    const setSong = (song) => {
        setCurrentSong(song);
        audio.src = '/api/assets/'+'user_'+user.data._id +'/'+song.src;
        audio.play();
        setIsPlaying(true);
    };



    const handleClick = () => {
        if(currentSong?._id!==data._id){   
            setSong(data)
        }
    }
    return (
        <div className={cn('w-full mb-1 flex items-center justify-start py-1.5 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md ',currentSong?._id==data._id?"bg-gradient-to-br from-pink-300 to-violet-400 dark:from-pink-600 dark:to-violet-700 ":"")} onClick={handleClick} >
            <div className="number mx-2 w-16 h-12 overflow-hidden">{data?.cover && <img className='h-full w-full object-cover rounded-md' src={'/api/assets/'+'user_'+user.data._id +'/'+data?.cover}/>}</div>
            <div className="title select-none truncate lg:w-80 ">
                {data.title}
            </div>
            <div className="menu-container ml-auto relative ">
                <Play className={cn('scale-75 m-1 fill-zinc-300 stroke-zinc-300',currentSong?._id!==data._id&&"fill-zinc-500 stroke-zinc-500")}/>
            </div>
        </div>
    )
}
