import React from 'react'
import Sidebar from '../components/Sidebar'
import AudioPlayer from '../components/AudioPlayer'
import DashboardCore from './DashboardCore'
import { MusicContextProvider } from '../contexts/MusicContextProvider'
import AddSongModal from '../components/AddSongModal'

export default function Dashboard() {
    return (
        <div className='dark:text-zinc-100 h-screen flex items-center'>
            <Sidebar />
            <MusicContextProvider>
                <div className="h-screen w-full flex flex-col">
                    <DashboardCore />
                    <AudioPlayer />
                </div>
                {/* <AddSongModal/> */}
            </MusicContextProvider>
        </div>
    )
}
