import { FastForward, Forward, NotepadText, Play, Rewind } from 'lucide-react'
import React from 'react'

export default function AudioPlayer() {
    
    return (
        <div className='p-4 pl-0' >
            <div className="inner bg-zinc-800 rounded-md p-2">
                <div className="progress">
                    <input id="small-range" type="range" value="0" onChange={()=>{}} className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm  dark:bg-gray-700" />
                </div>
                <div className="controls flex items-center justify-center gap-3">
                    <button className='prev bg-zinc-700 rounded-full h-10 w-10 pl-1.5 '><Rewind/></button>
                    <button className='prev bg-zinc-700 rounded-full h-12 w-12 pl-3.5'><Play/></button>
                    <button className='prev bg-zinc-700 rounded-full h-10 w-10 pl-2.5'><FastForward/></button>
                </div>
            </div>
        </div>
    )
}
