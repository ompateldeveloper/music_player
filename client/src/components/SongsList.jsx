import React, { useEffect, useState } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider'
import Song from './Song'
import axios from 'axios'
import { Delete, Drumstick, Trash, Trash2 } from 'lucide-react'
export default function SongsList({edit}) {
    const {songs,setSongs} = useMusicContext()
    const [isloading,setIsLoading] = useState(true);
    async function fetchSongs(){
        await axios.get('https://musicplayer-production-4f79.up.railway.app/api/v1/music')
        .then((data)=>{
            setSongs(data.data)
            setIsLoading(false)
        })
        .catch((error)=>console.error(error))
    }
    const handleDelete = async(data)=>{
        await axios.delete(`https://musicplayer-production-4f79.up.railway.app/api/v1/music/delete/${data._id}`)
        .then(()=>{
            const newSongs = songs.filter((song)=>{
                return data._id!==song._id;
            })
            setSongs(newSongs)
        })
    }
    useEffect(()=>{
        fetchSongs()
    },[])
    return (
        <div className='my-4 overflow-y-auto h-[57vh] songs-list pr-1'>
            {
                !isloading
                ?
                    songs && songs?.length
                    ?
                    songs?.map((data,index)=>(
                        <div className='flex items-center justify-center ' key={index}>
                            <Song data={data}  index={index}  />
                            { edit&& <div className='text-xs m-1 rounded-md hover:bg-zinc-600  '><Trash2 className='scale-75' onClick={()=>handleDelete(data)} /></div> }
                        </div>
                    ))
                    :
                    <div className='text-center text-zinc-500 p-4'> 
                        No Songs
                    </div>
                :
                <div className='text-center text-zinc-500 p-4'>
                    Loading
                </div>
            }
        </div>
    )
}
