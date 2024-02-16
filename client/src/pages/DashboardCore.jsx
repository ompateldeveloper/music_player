import React, { useState } from 'react'
import SongsList from '../components/SongsList'
import { Edit, HeadphonesIcon, Pen, Plus, Upload } from 'lucide-react'
import { useMusicContext } from '../contexts/MusicContextProvider';
import axios from 'axios';
import MusicForm from './Music';
export default function DashboardCore() {
    const { songs, setSongs } = useMusicContext();
    const [audioFile, setAudioFile] = useState(null);

    const handleChange = (e) => {
        setAudioFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        if (!audioFile) {
            console.error('Please select an audio file');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            const response = await axios.post('/api/v1/music', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (
        <div className='h-full p-4 pl-0 pb-0 '>
            <div className="inner bg-zinc-300  dark:bg-zinc-800 h-full w-full rounded-md p-2">
                <div className="songs-nav flex items-center gap-2">
                    <form className="add-music-container flex items-center gap-1" onSubmit={handleSubmit}>
                        <label htmlFor='add-music' className='text-xs px-4 py-2 bg-zinc-200 dark:bg-zinc-900 rounded-md max-w-32'>
                            {
                                !audioFile
                                    ?
                                    <div className="flex items-center select-none ">Add song<Plus className='w-4 ml-1' /></div>
                                    :
                                    <div className="truncate flex">
                                        {audioFile?.name}
                                    </div>
                            }
                        </label>
                        <input type="file" className='hidden' accept="audio/*" id="add-music" onChange={handleChange} />
                        {audioFile && <button className='text-xs px-4 py-2 bg-green-400 dark:bg-green-700 rounded-md flex items-center' ><Upload className='w-3.5 ' /></button>}
                    </form>
                    <button className='text-xs px-4 py-2 select-none bg-zinc-200 dark:bg-zinc-900 rounded-md flex items-center'>Edit <Edit className='w-3.5 ml-1' /></button>
                </div>
                {/* <MusicForm /> */}
                <SongsList />
            </div>
        </div>
    )
}
