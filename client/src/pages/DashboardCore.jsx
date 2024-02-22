import React, { useState } from 'react'
import SongsList from '../components/SongsList'
import { ChevronLeft, ChevronRight, Edit, Plus } from 'lucide-react'
import { useMusicContext } from '../contexts/MusicContextProvider';
import axios from 'axios';
import { useEffect } from 'react';
import { cn } from '../lib/utils';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useThemeContext } from '../contexts/ThemeContext';
export default function DashboardCore() {
    const { songs, setSongs } = useMusicContext();
    const { menu, setMenu } = useThemeContext();
    const { user } = useAuthContext();
    const [audioFile, setAudioFile] = useState(null);
    const [edit, setEdit] = useState(false);

    const handleChange = (e) => {
        setAudioFile(e.target.files[0]);
    }
    useEffect(() => {
        if (audioFile) {
            handleUpload()
        }
    }, [audioFile])
    const handleUpload = async (e) => {
        // e.preventDefault();

        if (!audioFile) {
            console.error('Please select an audio file');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioFile);


        await axios.post('/api/v1/music', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user?.meta.access_token}`,
            },
        })
            .then((data) => {
                setSongs([...songs, data.data])
                setAudioFile(null)
            })
            .catch((error) => {
                console.log(error);
                setAudioFile(null)

            })
    };
    return (
        <div className='h-full p-4 pl-0 pb-0 '>
            <div className="inner bg-zinc-200  dark:bg-zinc-800 h-full w-full rounded-md p-2">
                <div className="songs-nav flex items-center gap-2 md:pl-12">
                    <div className="logo hidden md:flex items-center justify-center  relative ">
                        <img src="./logo.png" className='h-12 dark:invert absolute opacity-40' alt="" />
                        <div className="dancing-script px-4 font-bold">CHORDS</div>
                    </div>
                    <form className="add-music-container flex items-center gap-1" >
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
                        {/* {audioFile && <button className='text-xs px-4 py-2 bg-green-400 dark:bg-green-700 rounded-md flex items-center' ><Upload className='w-3.5 ' /></button>} */}
                    </form>
                    <button className={cn('text-xs px-4 py-2 select-none bg-zinc-200 dark:bg-zinc-900 rounded-md flex items-center ', edit && "underline")} onClick={() => { setEdit(!edit) }}>Edit <Edit className='w-3.5 ml-1' /></button>
                </div>
                <SongsList edit={edit} />
            </div>
        </div>
    )
}
