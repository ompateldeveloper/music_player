import { Cross, MoreVertical, X } from 'lucide-react';
import React, { useState } from 'react'

export default function Song({ data, index }) {
    const [menu, setMenu] = useState(false);
    return (
        <div className='w-full flex items-center justify-start py-1.5 text-sm hover:bg-zinc-800 rounded-sm' >
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
                            <button className='h-6 bg-zinc-700 hover:bg-zinc-600'>Delete</button>
                            <button className='h-6 bg-zinc-700 hover:bg-zinc-600'>Edit</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
