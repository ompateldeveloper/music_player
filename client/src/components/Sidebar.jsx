import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import { Asterisk, Guitar, List, ListChecks, Mic, Moon, Plug, Plus, Sun } from 'lucide-react'
import { useThemeContext } from '../contexts/ThemeContext'
export default function Sidebar() {
    const {theme,setTheme} = useThemeContext()
    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [theme])
    return (
        <div className='h-screen min-w-64 p-4'>
            <div className="inner h-full bg-zinc-300 dark:bg-zinc-800 rounded-md overflow-hidden p-2 flex flex-col gap-2">
                <div className="logo flex flex-col items-center justify-center">
                    <img src="./logo.png" className='h-10 dark:invert ' alt="" />
                    <div className="dancing-script font-bold">CHORDS</div>
                </div>
                <SidebarButton title='All songs' icon={<Asterisk />} />
                <SidebarButton title='Artists' icon={<Mic />} />
                <SidebarButton title='Genere' icon={<Guitar />} />
                <SidebarButton title='PlayList' icon={<List />}  onClick = {()=>{document.documentElement.setAttribute('data-theme', 'light')}}/>
                <SidebarButton title='Recently added' icon={<Plus />} />
                <div className="theme-mode" onClick={() => { setTheme(!theme) }}>
                    {
                        theme
                            ?
                            <Sun />
                            :
                            <Moon />
                    }
                </div>
            </div>
        </div>
    )
}

function SidebarButton({ className, title, icon }) {
    return (
        <button className={cn(' duration-200 bg-gradient-to-br hover:from-zinc-200 from-zinc-300 to-zinc-300 dark:hover:from-zinc-600 dark:from-zinc-700 dark:to-zinc-700 h-10 w-full rounded-sm text-start pl-2 font-semibold text-sm dark:text-zinc-300 flex items-center', className)}>
            {icon &&
                <div className="mr-1">
                    {icon}
                </div>
            }
            {title || 'button title'}
        </button>
    )
}