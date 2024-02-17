import axios from 'axios';
import { Cross, MoreVertical, X } from 'lucide-react';
import React, { useState } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider';

export default function Song({ data, index }) {
    const [menu, setMenu] = useState(false);
    const {audio,songs,setSongs,currentSong,setCurrentSong,setIsPlaying} = useMusicContext();


    const setSong = (song) => {
        setCurrentSong(song);
        audio.src = 'https://musicplayer-production-4f79.up.railway.app/api/assets/'+song.src;
        audio.play();
        setIsPlaying(true);
    };


    const handleDelete = async(e)=>{
        await axios.delete(`https://musicplayer-production-4f79.up.railway.app/api/v1/music/delete/${data._id}`)
        .then(()=>{
            const newSongs = songs.filter((song)=>{
                return data._id!==song._id;
            })
            setSongs(newSongs)
            setMenu(false)
            console.log(newSongs);
        })
    }
    const handleClick = () => {
        console.log(data.src);
        if(currentSong?._id!==data._id){   
            setSong(data)
        }
    }
    return (
        <div className='w-full flex items-center justify-start py-1.5 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm' onClick={handleClick} >
            <div className="number ml-4  mr-2 w-16 h-12 overflow-hidden">{data?.cover && <img className='h-full w-full object-cover rounded-md' src={'https://musicplayer-production-4f79.up.railway.app/api/assets/'+data?.cover}/>}</div>
            <div className="title select-none truncate">
                {data.title}
            </div>
            <div className="menu-container ml-auto relative">
                <div className="menu-btn  w-6 mr-1 rounded-full hover:bg-zinc-600" onClick={() => { setMenu(!menu) }}><MoreVertical /></div>
                {
                    menu &&
                    (
                        <div className="menu absolute bg-zinc-700 w-32 z-50 left-1/2 top-1/2 -translate-x-full rounded shadow-md grid ">
                            <button className="close bg-zinc-800 rounded-full w-4 h-4 m-1 " onClick={()=>{setMenu(false)}}><X className='h-4 w-4'/></button>
                            <button className='h-6 bg-zinc-700 hover:bg-zinc-600' onClick={handleDelete}>Delete</button>
                            <button className='h-6 bg-zinc-700 hover:bg-zinc-600'>Edit</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
