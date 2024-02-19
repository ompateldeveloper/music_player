import React from 'react'
import Sidebar from '../components/Sidebar'
import AudioPlayer from '../components/AudioPlayer'
import DashboardCore from './DashboardCore'
import { MusicContextProvider } from '../contexts/MusicContextProvider'
import AddSongModal from '../components/AddSongModal'

export default function Dashboard() {
    return (
        <div className='dark:text-zinc-100 dark:bg-zinc-900 h-screen flex items-center  '>
            <Sidebar />
            <MusicContextProvider>
                <div className="h-screen w-full flex flex-col flex-grow-0 relative">
                    <DashboardCore />
                    <AudioPlayer />
                </div>
                {/* <AddSongModal/> */}
            </MusicContextProvider>
        </div>
    )
}
