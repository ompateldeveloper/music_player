import React from 'react'

export default function Song({data,index}) {
    return (
        <div className='w-full flex items-center justify-start py-1.5 text-sm hover:bg-zinc-700 rounded-sm' >
            <div className="number ml-4  mr-2">{index+1}.</div>
            <div className="title">
            {data.title}    
            </div>
        </div>
    )
}
