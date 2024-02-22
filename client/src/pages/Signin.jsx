import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { Link } from 'react-router-dom';

export default function Signin() {
    const [details, setDetails] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const [err, setErr] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        let { email, password } = details
        setIsLoading(true)
        setErr("")

        const response = await fetch('/api/v1/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErr(json.err)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
        }
    }
    return (
        <form className=' px-8 mx-auto py-12 w-min' onSubmit={handleSubmit}>
            <div className="title m-2 text-xl text-gray-900">Sign In</div>
  
            <div className="email relative pt-6 m-3">
                <input type="text" name="email" id="email" className=" w-64 peer/email bg-transparent border-0 border-b-2 border-b-gray-400 focus:border-b-violet-400 outline-none text-gray-900 transition duration-300 " onChange={(e) => { setDetails(prev => ({ ...prev, email: e.target.value })) }} value={details.email} />
                <label htmlFor="email" className={" peer-focus/email:text-violet-400 text-gray-400 absolute left-0  peer-focus/email:text-xs peer-focus/email:-translate-y-5 transition-all duration-300 select-none" + (details.email?.length ? " text-xs -translate-y-5 " : " translate-y-0")}>Email</label>
            </div>
            <div className="password relative pt-6 m-3 mt-6">
                <input type="password" autoComplete='on' name="password" id="password" className=" w-64 peer/password bg-transparent border-0 border-b-2 border-b-gray-400 focus:border-b-violet-400 outline-none text-gray-900 transition duration-300" onChange={(e) => { setDetails(prev => ({ ...prev, password: e.target.value })) }} value={details.password} />
                <label htmlFor="password" className={" peer-focus/password:text-violet-500 text-gray-400 absolute left-0  peer-focus/password:text-xs peer-focus/password:-translate-y-5 transition-all duration-300 select-none" + (details.password?.length ? " text-xs -translate-y-5 " : " translate-y-0")}>Password</label>
            </div>
            <button disabled={isLoading} className=" flex items-center group self-start py-2 px-6 rounded-md font-bold text-sm m-2 mt-8 bg-gradient-to-br from-pink-300 to-violet-400  text-white" >
                <span>Sign In</span>
                <div className="ml-2 hidden group-disabled:grid">
                </div>
            </button>
            <div className="not-user text-gray-400 m-3 text-sm">
                Not User? &nbsp;
                <Link to={'/signup'} className="text-violet-500" >Sign Up</Link>
            </div>
        </form>
    )
}
