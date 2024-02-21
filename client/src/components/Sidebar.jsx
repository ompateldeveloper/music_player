import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import { Asterisk, Guitar, List, ListChecks, Mic, Moon, Plug, Plus, Sun, User, User2 } from 'lucide-react'
import { useThemeContext } from '../contexts/ThemeContext'
import { useMusicContext } from '../contexts/MusicContextProvider'
import { useAuthContext } from '../contexts/AuthContextProvider'
export default function Sidebar() {
    const {theme,setTheme,tab, setTab} = useThemeContext()
    const {dispatch} = useAuthContext()
    return (
        <div className='h-screen min-w-64 p-4 pr-0   overflow-hidden relative'>
            <div className="inner h-full bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden p-2 flex flex-col gap-2">
                <div className="logo flex flex-col items-center justify-center">
                    <img src="./logo.png" className='h-10 dark:invert ' alt="" />
                    <div className="dancing-script font-bold">CHORDS</div>
                </div>
                <SidebarButton tabIndex={0} title='All songs' icon={<Asterisk />} />
                <SidebarButton tabIndex={1} title='Artists' icon={<Mic />} />
                <SidebarButton tabIndex={2} title='Genere' icon={<Guitar />} />
                <SidebarButton tabIndex={3} title='PlayList' icon={<List />}/>
                <SidebarButton tabIndex={4} title='Recently added' icon={<Plus />} />
            </div>
                <div className="absolute bottom-4 p-1 w-[calc(100%-16px)] flex items-center justify-between ">
                    <div className="theme-mode p-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-md   " onClick={() => { setTheme(theme==='dark'?'light':'dark') }}>
                        {
                            theme==='dark'
                                ?
                                <Sun />
                                :
                                <Moon />
                        }
                    </div>
                    <div className="user rounded-md p-1 bg-orange-600 h-8 w-8 text-center " onClick={()=>dispatch({type:'LOGOUT'})}>
                        {"OP"}
                    </div>
                </div>
        </div>
    )
}

function SidebarButton({  title, icon,tabIndex }) {
    const {tab,setTab} = useMusicContext()
    return (
        <button className={cn(' duration-200 bg-gradient-to-br bg-zinc-300 hover:bg-opacity-40 dark:hover:bg-opacity-40 dark:bg-zinc-700 h-10 w-full rounded-sm text-start pl-2 font-semibold text-sm dark:text-zinc-300 flex items-center',tab===tabIndex&&"bg-gradient-to-br from-pink-300 to-violet-400 dark:from-pink-600 dark:to-violet-700 hover: ")} onClick={()=>{setTab(tabIndex)}}>
            {icon &&
                <div className="mr-1">
                    {icon}
                </div>
            }
            {title || null}
        </button>
    )
}