import React, { useState } from 'react'
import SongsList from '../components/SongsList'
import { Edit, Pen, Plus, Upload } from 'lucide-react'
import { useMusicContext } from '../contexts/MusicContextProvider';
import axios from 'axios';
export default function DashboardCore() {
    const {songs,setSongs} = useMusicContext();
    const [musicFile, setMusicFile] = useState(null);
    const [formData,setFormData] = useState({title:'',artist:''})
    const handleChange = (e) => {
        setMusicFile(e.target.files[0]);
    }
    const handleFileSubmit = async() => {
        if (musicFile) {
            // const reader = new FileReader();
            // reader.onload = (e) => {
            //     const arrayBuffer = e.target.result;

            //     console.log(arrayBuffer);
            // }
            // reader.readAsArrayBuffer(musicFile)
            await axios.post('https://chords-r6bo.onrender.com/api/v1/music',formData)
            .then((data)=>{
                setSongs([...songs,data.data])
            })
        }
    }
    onsubmit
    return (
        <div className='h-full p-4 pl-0 pb-0 '>
            <div className="inner bg-zinc-300  dark:bg-zinc-800 h-full w-full rounded-md p-2">
                <div className="songs-nav flex items-center gap-2">
                    <div className="add-music-container flex items-center">
                        <label htmlFor='add-music' className='text-xs px-4 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-md flex items-center'>Add song <Plus className='w-4 ml-1' /></label>
                        <input type="file" className='hidden' accept="audio/*" name="" id="add-music" onChange={handleChange} />
                    </div>
                    <button className='text-xs px-4 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-md flex items-center'>Edit <Edit className='w-3.5 ml-1' /></button>
                </div>
                    {musicFile && (
                            <div className='flex'>
                                <input type="text" className='dark:bg-transparent border dark:text-white' name="" id="" onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
                                <button className='text-xs px-4 py-2 bg-zinc-900 rounded-md flex items-center' onClick={handleFileSubmit}>Upload <Upload /></button>
                            </div>
                    )}
                <SongsList />
            </div>
        </div>
    )
}
