import axios from 'axios';
import { Cross, MoreVertical, X } from 'lucide-react';
import React, { useState } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider';

export default function Song({ data, index }) {
    const [menu, setMenu] = useState(false);
    const {songs,setSongs} = useMusicContext();
    const handleDelete = async(e)=>{
        await axios.delete(`https://chords-r6bo.onrender.com/api/v1/music/delete/${data._id}`)
        .then(()=>{
            const newSongs = songs.filter((song)=>{
                console.log(data._id,song._id);
                return data._id!==song._id;
            })
            setSongs(newSongs)
            console.log(newSongs);
        })
    }
    return (
        <div className='w-full flex items-center justify-start py-1.5 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm' >
            <div className="number ml-4  mr-2">{index + 1}.</div>
            <div className="title">
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
