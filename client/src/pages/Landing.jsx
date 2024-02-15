import React from 'react'
import Navbar from '../components/Navbar'

export default function Landing() {
    return (
        <div>
            <Navbar/>
            <div className="hero h-screen relative">
                <div className="absolute flex items-center justify-center overflow-hidden inset-0 blur-3xl">
                    <div className="absolute h-96 w-96 bg-blue-500 opacity-10 rounded-full -translate-x-64"></div>
                    <div className="absolute h-96 w-96 bg-violet-500 opacity-10 rounded-full -translate-y-64"></div>
                    <div className="absolute h-96 w-96 bg-pink-500 opacity-10 rounded-full translate-y-20 translate-x-36"></div>
                </div>
            </div>
        </div>
    )
}
