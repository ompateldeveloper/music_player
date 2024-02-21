import React, { useEffect, useState } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider'
import Song from './Song'
import axios from 'axios'
export default function SongsList() {
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
    useEffect(()=>{
        // const tempsongs = [
        //     {id:1,title:'Crossing Field',artist:'lisa',album:'unknown'},
        //     {id:2,title:'Anima',artist:'lisa',album:'unknown'},
        //     {id:3,title:'Unity',artist:'Alan Walker',album:'unknown'}
        // ]
        // setSongs(tempsongs)
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
                        <Song data={data} key={index} index={index} />
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
