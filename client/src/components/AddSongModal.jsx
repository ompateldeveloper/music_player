import React, { useState } from 'react'

export default function AddSongModal() {
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState({});
    return (
        <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
            <form className='bg-zinc-700 w-96 h-64 rounded-md'>
                
            </form>
        </div>
    )
}
