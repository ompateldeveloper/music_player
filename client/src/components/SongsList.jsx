import React, { useEffect } from 'react'
import { useMusicContext } from '../contexts/MusicContextProvider'
import Song from './Song'
import axios from 'axios'
export default function SongsList() {
    const {songs,setSongs} = useMusicContext()
    async function fetchSongs(){
        await axios.get('http://localhost:4000/api/v1/music')
        .then((data)=>{
            setSongs(data.data)
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
        <div className='my-4 overflow-y-auto h-[57vh] '>
            {
                songs &&
                songs?.map((data,index)=>(
                    <Song data={data} key={index} index={index} />
                ))
            }
        </div>
    )
}
